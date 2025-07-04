//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CampusDAONFT is ERC721, ERC721Enumerable, Ownable{
    uint256 public _nextTokenId;
    mapping(uint256 => uint256) public contributions;

    constructor () ERC721("CampusDAO Member", "CAMPUS") Ownable(msg.sender) {}

    function mintNFT(address to, uint256 initialContributions) public onlyOwner(){
        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);

        contributions[tokenId] = initialContributions;
        _nextTokenId++;
    }

    function updateContributions(uint256 tokenId, uint256 newTotal) public onlyOwner(){
        contributions[tokenId] = newTotal;
    }

    function userTokens(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        for(uint256 i = 0; i< balance; i++){
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokens;
    }

    function getVotingPower(address user) public view returns(uint256){
        uint256 power=0;
        uint256[] memory tokens = userTokens(user);

        for( uint256 i = 0;i < tokens.length; i++){
            power += contributions[tokens[i]];
        }
        return power;
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
    
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public 
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return (super.supportsInterface(interfaceId));
    }

}