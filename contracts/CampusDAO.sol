//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./CampusDAONFT.sol";


contract CampusDAO is ReentrancyGuard{
    struct Project{
        uint256 projectId;
        string title;
        string description;
        string expectations;
        string techStack;
        string githubRepo;
        address owner;
        address[] members;
        mapping(address => bool) isMember;
        bool isActive;
        uint256 createdAt;
        uint256 maxMembers;
    }

    struct JoinRequest{
        uint256 requestId;
        uint256 projectId;
        address applicant;
        string message;
        uint256 timestamp;
        bool isApproved;
        bool isProcessed;     
    }

    struct Proposal{
        uint256 proposalId;
        uint256 projectId;
        address proposer;
        address target;
        string description;
        uint256 forVotes;
        uint256 AgainstVotes;
        mapping(address => bool) hasVoted;
        bool isExecuted;
        uint256 deadline;
        ProposalType proposalType;
    }

    enum ProposalType {
        ADD_MEMBER,
        REMOVE_MEMBER,
        UPDATE_PROJECT,
        GOVERNANCE
    }

    CampusDAONFT public nftContract;

    mapping(uint256 => Project) projects;
    mapping(uint256 => JoinRequest) public joinRequests;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userProjects;
    mapping(address => uint256) public userTotalContributions;
    mapping(address => mapping(uint256 => uint256)) public userProjectContributions; 


    uint256 public nextProjectId; 
    uint256 public nextRequestId; 
    uint256 public nextProposalId; 

    event ProjectCreated(uint256 indexed projectId, address indexed owner, string title);
    event JoinRequestSubmitted(uint256 indexed requestId, uint256 indexed projectId, address indexed applicant);
    event MemberAdded(uint256 indexed projectId, address indexed member);
    event MemberRemoved(uint256 indexed projectId, address indexed member);
    event ProposalCreated(uint256 indexed proposalId, uint256 indexed projectId, address indexed proposer, ProposalType proposalType);
    event VoteCasted(uint256 indexed proposalId, address indexed voter, bool favour, uint256 power);

    constructor (address _nftContract){
        nftContract = CampusDAONFT(_nftContract);
    }

    function createProject(
        string memory title,
        string memory description,
        string memory expectations,
        string memory techStack,
        string memory githubRepo,
        uint256 maxMembers
    ) public {
        uint256 projectId = nextProjectId++;

        Project storage p = projects[projectId];
        p.projectId = projectId;
        p.title = title;
        p.description = description;
        p.expectations = expectations;
        p.techStack = techStack;
        p.githubRepo = githubRepo;
        p.owner = msg.sender;
        p.isActive = true;
        p.createdAt = block.timestamp;
        p.maxMembers = maxMembers;

        //Adding owner as the first member
        p.members.push(msg.sender);
        p.isMember[msg.sender] = true;

        userProjects[msg.sender].push(projectId);
        
        emit ProjectCreated(projectId, msg.sender, title);
    }

    function requestToJoin(uint256 projectId, string memory message) public{
        require(projects[projectId].isActive, "Project is inactive");
        require(!projects[projectId].isMember[msg.sender], "Already a member");
        require(projects[projectId].members.length < projects[projectId].maxMembers, "Project full");

        uint256 requestId = nextRequestId++ ;
        joinRequests[requestId] = JoinRequest({
            requestId: requestId,
            projectId: projectId,
            applicant: msg.sender,
            message: message,
            timestamp: block.timestamp,
            isApproved: false,
            isProcessed: false
        }); 

        emit JoinRequestSubmitted(requestId, projectId, msg.sender);
    }

    function getJoinRequest(uint256 requestId) public view returns (
        uint256 id,
        uint256 projectId,
        address applicant,
        string memory message,
        uint256 timestamp,
        bool isApproved,
        bool isProcessed
    ) {
        JoinRequest storage req = joinRequests[requestId];
        return (
            req.requestId,
            req.projectId,
            req.applicant,
            req.message,
            req.timestamp,
            req.isApproved,
            req.isProcessed
        );
    }

    function approveJoinRequest(uint256 requestId) public {
        JoinRequest storage request = joinRequests[requestId];
        require(projects[request.projectId].owner == msg.sender, "Only owner can approve");
        require(!request.isProcessed, "Request already processed");
    
        projects[request.projectId].members.push(request.applicant);
        projects[request.projectId].isMember[request.applicant] = true;
    
        request.isApproved = true;
        request.isProcessed = true;
    
        emit MemberAdded(request.projectId, request.applicant);
    }

    function createProposal(uint256 projectId, string memory description, address target, ProposalType proposalType) public {
        require(projects[projectId].isMember[msg.sender], "Not a project Member");
        require(nftContract.balanceOf(msg.sender) > 0, "Must own a NFT to create proposal");

        uint256 proposalId = nextProposalId++ ; 
        Proposal storage prop = proposals[proposalId];
        prop.proposalId = proposalId;
        prop.projectId = projectId;
        prop.proposer = msg.sender;
        prop.target = target;
        prop.description = description;
        prop.deadline = block.timestamp + 7 days;
        prop.proposalType = proposalType;

        emit ProposalCreated(proposalId, projectId, msg.sender, proposalType);
    }

    function getProposalInfo(uint256 proposalId) public view returns (
        uint256 id,
        uint256 projectId,
        address proposer,
        string memory description,
        uint256 forVotes,
        uint256 againstVotes,
        bool isExecuted,
        uint256 deadline,
        ProposalType proposalType
    ) {
        Proposal storage prop = proposals[proposalId];
        return (
            prop.proposalId,
            prop.projectId,
            prop.proposer,
            prop.description,
            prop.forVotes,
            prop.AgainstVotes,
            prop.isExecuted,
            prop.deadline,
            prop.proposalType
        );
    }

    function vote(uint256 proposalId, bool favour) public{
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(projects[proposal.projectId].isMember[msg.sender], "Not a project member");
        require(!proposal.hasVoted[msg.sender], "You have already voted");

        uint256 votingPower = nftContract.getVotingPower(msg.sender);
        require(votingPower > 0, "Need voting power to vote");

        proposal.hasVoted[msg.sender] = true;

        if(favour){
            proposal.forVotes += votingPower;
        } else{
            proposal.AgainstVotes += votingPower;
        }

        emit VoteCasted(proposalId, msg.sender, favour, votingPower);
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage prop = proposals[proposalId];
        require(block.timestamp >= prop.deadline, "Voting period ongoing");
        require(!prop.isExecuted, "Proposal already executed");
        require(prop.forVotes > prop.AgainstVotes, "Proposal rejected");
        require(prop.forVotes > 0, "No votes cast");

        prop.isExecuted = true;

        if(prop.proposalType == ProposalType.ADD_MEMBER){
            require(!projects[prop.projectId].isMember[prop.target], "Already a member");
            require(projects[prop.projectId].members.length < projects[prop.projectId].maxMembers, "Project full");
            
            projects[prop.projectId].members.push(prop.target);
            projects[prop.projectId].isMember[prop.target] = true;
            userProjects[prop.target].push(prop.projectId);
        
            emit MemberAdded(prop.projectId, prop.target);
            
        } else if(prop.proposalType == ProposalType.REMOVE_MEMBER){
            require(projects[prop.projectId].isMember[prop.target], "Not a member");
            require(prop.target != projects[prop.projectId].owner, "Cannot remove project owner");
            
            // Remove from isMember mapping
            projects[prop.projectId].isMember[prop.target] = false;
            
            // Remove from members array
            address[] storage members = projects[prop.projectId].members;
            uint256 len = members.length;

            for(uint256 i = 0; i < len; i++){
                if(members[i] == prop.target){ // FIXED: was prop.proposer
                    for(uint256 j = i; j < len - 1; j++){
                        members[j] = members[j+1];
                    }
                    members.pop();
                    break;
                }
            }

            emit MemberRemoved(prop.projectId, prop.target);
        }
        // TODO: Implement UPDATE_PROJECT and GOVERNANCE proposal types
    }

    function recordContributions(address contributor, uint256 projectId, uint256 noOfContributions) public {
        require(projects[projectId].owner == msg.sender, "Only project owner can record contributions");
        require(projects[projectId].isMember[contributor], "Not a project member");
        require(noOfContributions > 0, "Contributions must be greater than 0");

        userProjectContributions[contributor][projectId] += noOfContributions;
        
        
        userTotalContributions[contributor] += noOfContributions;
        uint256 totalContributions = userTotalContributions[contributor];

        if (nftContract.balanceOf(contributor) > 0) {
            // Update existing NFT
            uint256[] memory tokens = nftContract.userTokens(contributor);
            nftContract.updateContributions(tokens[0], totalContributions);
        } else {
            // Mint new NFT
            nftContract.mintNFT(contributor, totalContributions);
        }
    }



    function getProjectInfo(uint256 projectId) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        string memory expectations,
        string memory techStack,
        string memory githubRepo,
        address owner,
        bool isActive,
        uint256 createdAt,
        uint256 maxMembers,
        uint256 currentMemberCount
    ) {
        Project storage p = projects[projectId];
        return (
            p.projectId,
            p.title,
            p.description,
            p.expectations,
            p.techStack,
            p.githubRepo,
            p.owner,
            p.isActive,
            p.createdAt,
            p.maxMembers,
            p.members.length
        );
    }

    function getAllProjects() public view returns (
        uint256[] memory ids,
        string[] memory titles,
        address[] memory owners,
        uint256[] memory memberCounts,
        bool[] memory activeStatus
    ) {
        uint256 length = nextProjectId;

        ids = new uint256[](length);
        titles = new string[](length);
        owners = new address[](length);
        memberCounts = new uint256[](length);
        activeStatus = new bool[](length);

        for (uint256 i = 0; i < length; i++) {
            Project storage p = projects[i];
            ids[i] = p.projectId;
            titles[i] = p.title;
            owners[i] = p.owner;
            memberCounts[i] = p.members.length;
            activeStatus[i] = p.isActive;
        }
    }


    function getProjectMembers(uint256 projectId) public view returns (address[] memory) {
        return projects[projectId].members;
    }

    function getUserProjectContributions(address user, uint256 projectId) public view returns(uint256) {
        return userProjectContributions[user][projectId];
    }

    function getUserProjects(address user) public view returns(uint256[] memory){
        return userProjects[user];
    }

    function getUserTotalContributions(address user) public view returns(uint256){
        return userTotalContributions[user];
    }
}