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

    mapping(uint256 => Project) public projects;
    mapping(uint256 => JoinRequest) public joinRequests;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userProjects;
    mapping(address => uint256[]) public userContributions;

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

    function createProposal(uint256 projectId, string memory description, ProposalType proposalType) public {
        require(projects[projectId].isMember[msg.sender], "Not a project Member");
        require(nftContract.balanceOf(msg.sender) > 0, "Must own a NFT to create proposal");

        uint256 proposalId = nextProposalId++ ; 
        Proposal storage prop = proposals[proposalId];
        prop.proposalId = proposalId;
        prop.projectId = projectId;
        prop.proposer = msg.sender;
        prop.description = description;
        prop.deadline = block.timestamp + 7 days;
        prop.proposalType = proposalType;

        emit ProposalCreated(proposalId, projectId, msg.sender, proposalType);
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
        require(block.timestamp >= prop.deadline, "Ongoing Voting period");
        require(!prop.isExecuted, "Proposal already executed");
        require(prop.forVotes > prop.AgainstVotes, "Proposal rejected");

        prop.isExecuted = true;

        if(prop.proposalType == ProposalType.ADD_MEMBER){
            require(!projects[prop.projectId].isMember[msg.sender], "Already a member");
            projects[prop.projectId].members.push(prop.proposer);
            projects[prop.projectId].isMember[msg.sender] = true;
            
            emit MemberAdded(prop.projectId, prop.proposer);
        } else if(prop.proposalType == ProposalType.REMOVE_MEMBER){
            require(projects[prop.projectId].isMember[msg.sender], "Not a member");
            address[] storage members = projects[prop.projectId].members;
            uint256 len = members.length;

            for(uint256 i = 0; i < len; i++){
                if(members[i] == prop.proposer){
                    for(uint256 j = i; j < len - 1; j++){
                        members[j] = members[j+1];
                    }
                    members.pop();
                    break;
                }
            }

            emit MemberRemoved(prop.projectId, prop.proposer);
        } //update project
    }

    function recordContributions(address contributor, uint256 projectId, uint256 noOfContributions) public {
        require(projects[projectId].owner == msg.sender, "Only project owner can add contributions");
        require(projects[projectId].isMember[contributor], "Not a project member");

        userContributions[contributor].push(noOfContributions);

        uint256 total = 0;
        for (uint i = 0; i < userContributions[contributor].length; i++) {
            total += userContributions[contributor][i];
        }

        if (nftContract.balanceOf(contributor) > 0) {
            uint256[] memory tokens = nftContract.userTokens(contributor);
            for (uint i = 0; i < userContributions[contributor].length; i++) {
                total += userContributions[contributor][i];
            }
            nftContract.updateContributions(tokens[0], total);
        } else {
            nftContract.mintNFT(contributor, total);
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
        address[] memory members,
        bool isActive,
        uint256 createdAt,
        uint256 maxMembers 
    ){
        Project storage p = projects[projectId];
        return(
            p.projectId,
            p.title,
            p.description,
            p.expectations,
            p.techStack,
            p.githubRepo,
            p.owner,
            p.members,
            p.isActive,
            p.createdAt,
            p.maxMembers
        );
    }

    function getUserProjects(address user) public view returns(uint256[] memory){
        return userProjects[user];
    }

    function getUserContributions(address user) public view returns(uint256[] memory){
        return userContributions[user];
    }    
}