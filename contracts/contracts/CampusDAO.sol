// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CampusDAONFT.sol";

contract CampusDAO is Ownable {
    enum ProjectStatus { Open, DAOFormed, Completed }
    enum JoinStatus { None, Pending, Approved, Rejected }
    enum Vote { None, Yes, No }

    struct Project {
        uint256 id;
        string title; // <-- Add this line
        string ipfsMetadata; // IPFS hash for project metadata
        address owner;
        address[] members;
        ProjectStatus status;
        uint256 joinRequestCount;
        mapping(address => JoinStatus) joinStatus;
        mapping(address => bool) isMember;
        mapping(uint256 => JoinRequest) joinRequests;
        uint256 memberCount;
        uint256 maxMembers;
        mapping(address => string) roles; 
        uint256 deadline; // Timestamp after which NFTs can be minted
        bool nftsMinted;
    }

    struct JoinRequest {
        address applicant;
        uint256 votesYes;
        uint256 votesNo;
        mapping(address => Vote) votes;
        bool decided;
    }

    CampusDAONFT public nft;
    uint256 public nextProjectId;
    mapping(uint256 => Project) public projects;

    event ProjectCreated(uint256 indexed projectId, address indexed owner, string ipfsMetadata, uint256 deadline);
    event JoinRequested(uint256 indexed projectId, address indexed applicant);
    event JoinApproved(uint256 indexed projectId, address indexed applicant);
    event MemberVoted(uint256 indexed projectId, address indexed voter, address indexed applicant, bool approve);
    event NFTMinted(address indexed to, uint256 indexed projectId);

    constructor(address nftAddress) Ownable(msg.sender) {
        nft = CampusDAONFT(nftAddress);
    }

    // Create a new project with IPFS metadata and maxMembers
    function createProject(string memory title, string memory ipfsMetadata, uint256 maxMembers, uint256 deadline) external {
        uint256 projectId = nextProjectId++;
        Project storage p = projects[projectId];
        p.id = projectId;
        p.title = title;  
        p.ipfsMetadata = ipfsMetadata;
        p.owner = msg.sender;
        p.status = ProjectStatus.Open;
        p.members.push(msg.sender);
        p.isMember[msg.sender] = true;
        p.memberCount = 1;
        p.maxMembers = maxMembers;
        p.deadline = deadline;
        p.nftsMinted = false;
        emit ProjectCreated(projectId, msg.sender, ipfsMetadata, deadline);
    }

    function getMyDAOsJoinRequests(address user) external view returns (
        uint256[] memory projectIds,
        uint256[] memory requestIds,
        address[] memory applicants,
        bool[] memory decided
    ) {
        uint256 totalRequests = 0;
        // First, count total requests for sizing arrays
        for (uint256 pid = 0; pid < nextProjectId; pid++) {
            Project storage p = projects[pid];
            if (p.isMember[user]) {
                for (uint256 rid = 0; rid < p.joinRequestCount; rid++) {
                    totalRequests++;
                }
            }
        }
        // Prepare arrays
        projectIds = new uint256[](totalRequests);
        requestIds = new uint256[](totalRequests);
        applicants = new address[](totalRequests);
        decided = new bool[](totalRequests);

        uint256 idx = 0;
        for (uint256 pid = 0; pid < nextProjectId; pid++) {
            Project storage p = projects[pid];
            if (p.isMember[user]) {
                for (uint256 rid = 0; rid < p.joinRequestCount; rid++) {
                    JoinRequest storage jr = p.joinRequests[rid];
                    projectIds[idx] = pid;
                    requestIds[idx] = rid;
                    applicants[idx] = jr.applicant;
                    decided[idx] = jr.decided;
                    idx++;
                }
            }
        }
    }

    // Request to join a project
    function requestToJoin(uint256 projectId) external {
        Project storage p = projects[projectId];
        require(p.status == ProjectStatus.Open || p.status == ProjectStatus.DAOFormed, "Project not open");
        require(!p.isMember[msg.sender], "Already a member");
        require(p.joinStatus[msg.sender] == JoinStatus.None, "Already requested");
        require(p.memberCount < p.maxMembers, "Max members reached");

        uint256 reqId = p.joinRequestCount++;
        JoinRequest storage jr = p.joinRequests[reqId];
        jr.applicant = msg.sender;
        p.joinStatus[msg.sender] = JoinStatus.Pending;

        emit JoinRequested(projectId, msg.sender);
    }

    // Approve or vote on a join request
    function approveJoin(uint256 projectId, uint256 reqId, bool approve, string memory role) public {
        Project storage p = projects[projectId];
        JoinRequest storage jr = p.joinRequests[reqId];
        require(jr.applicant != address(0), "Invalid request");
        require(!jr.decided, "Already decided");

        if (p.memberCount < 2) {
            require(msg.sender == p.owner, "Only owner can approve");
            if (approve) {
                _addMember(projectId, jr.applicant, role);
                p.joinStatus[jr.applicant] = JoinStatus.Approved;
                jr.decided = true;
                emit JoinApproved(projectId, jr.applicant);
                p.status = ProjectStatus.DAOFormed;
            } else {
                p.joinStatus[jr.applicant] = JoinStatus.Rejected;
                jr.decided = true;
            }
        } else {
            require(p.isMember[msg.sender], "Only DAO members can vote");
            require(jr.votes[msg.sender] == Vote.None, "Already voted");
            if (approve) {
                jr.votesYes++;
                jr.votes[msg.sender] = Vote.Yes;
            } else {
                jr.votesNo++;
                jr.votes[msg.sender] = Vote.No;
            }
            emit MemberVoted(projectId, msg.sender, jr.applicant, approve);

            if (jr.votesYes > p.memberCount / 2) {
                _addMember(projectId, jr.applicant, role);
                p.joinStatus[jr.applicant] = JoinStatus.Approved;
                jr.decided = true;
                emit JoinApproved(projectId, jr.applicant);
            } else if (jr.votesNo >= (p.memberCount + 1) / 2) {
                p.joinStatus[jr.applicant] = JoinStatus.Rejected;
                jr.decided = true;
            }
        }
    }

    function _addMember(uint256 projectId, address member, string memory role) internal {
        Project storage p = projects[projectId];
        p.members.push(member);
        p.isMember[member] = true;
        p.memberCount++;
        p.roles[member] = role; // Assign the role
    }

    // Mint NFTs to all contributors after the deadline
    function mintNFTsToContributors(uint256 projectId) external {
        Project storage p = projects[projectId];
        require(msg.sender == p.owner, "Only project owner can mint");
        require(p.status == ProjectStatus.DAOFormed, "DAO not formed");
        require(block.timestamp >= p.deadline, "Deadline not reached");
        require(!p.nftsMinted, "NFTs already minted");

        for (uint256 i = 0; i < p.members.length; i++) {
            address member = p.members[i];
            string memory role = p.roles[member];
            nft.mint(member, getProjectTitle(projectId), role);
            emit NFTMinted(member, projectId);
        }
        p.status = ProjectStatus.Completed;
        p.nftsMinted = true;
    }
    
    function getProjectTitle(uint256 projectId) public view returns (string memory) {
        return projects[projectId].title;
    }

    // View functions
    function getProjectMembers(uint256 projectId) external view returns (address[] memory) {
        return projects[projectId].members;
    }

    function getProjectStatus(uint256 projectId) external view returns (ProjectStatus) {
        return projects[projectId].status;
    }

    function getProjectMetadata(uint256 projectId) external view returns (string memory) {
        return projects[projectId].ipfsMetadata;
    }

    function getMemberRole(uint256 projectId, address member) external view returns (string memory) {
        return projects[projectId].roles[member];
    }
}
