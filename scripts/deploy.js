const hre = require("hardhat");

async function main(){
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with address:", deployer.address);

    const daoNFT = await hre.ethers.getContractFactory("CampusDAONFT");
    const nftContract = await daoNFT.deploy();
    await nftContract.waitForDeployment();
    const nftAddress = await nftContract.getAddress();

    console.log("CampusDAONFT deployed at:", nftAddress);

    const dao = await hre.ethers.getContractFactory("CampusDAO");
    const daoContract = await dao.deploy(nftAddress);
    await daoContract.waitForDeployment();
    const daoAddress = await daoContract.getAddress();

    console.log("CampusDAO deployed at:", daoAddress);
}

main().catch((error) => {
    console.error("Error deloying contracts:", error);
    process.exit(1);
});
