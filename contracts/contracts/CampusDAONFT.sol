// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CampusDAONFT is ERC721Enumerable, Ownable {
    uint256 public nextTokenId;

    struct NFTData {
        string projectTitle;
        string role;
    }

    mapping(uint256 => NFTData) public nftData;

    constructor() ERC721("CampusDAO Contributor", "CDAO-NFT") Ownable(msg.sender) {}

    function mint(address to, string memory projectTitle, string memory role) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        nftData[tokenId] = NFTData(projectTitle, role);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        NFTData memory data = nftData[tokenId];

        // Compose the metadata JSON
        string memory json = string(abi.encodePacked(
            '{"name":"CampusDAO Contributor #', Strings.toString(tokenId),
            '", "description":"On-chain NFT for CampusDAO contributors",',
            '"projectTitle":"', data.projectTitle,
            '", "role":"', data.role, '"}'
        ));

        // Encode as base64 and return as data URI
        string memory encoded = Base64.encode(bytes(json));
        return string(abi.encodePacked("data:application/json;base64,", encoded));
    }
}
