import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useUser } from "@account-kit/react";
import { useLogout, useSignerStatus } from "@account-kit/react";
import { useEffect, useState } from "react";
import { parseAbi, encodeFunctionData } from "viem";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import {fetchNFTs} from './utils/fetchNFTs';

const statsData = [
  {
    title: "Active Projects",
    value: "2",
  },
  {
    title: "REP Tokens Earned",
    value: "10",
  },
];

const nftBadges = [
  {
    title: "Developer",
    description: "EventFlow",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0e99d0af034b3a9e659ae17d731eb4090e7b3409?width=602",
  },
];

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-col p-6 gap-2 flex-1 border border-gray-300 rounded-xl min-w-[158px]">
    <div className="text-base font-medium text-gray-900">{title}</div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

const NFTBadgeCard = ({
  title,
  role,
}: {
  title: string;
  role: string;
}) => (
  <div className="flex flex-col w-[301px] pb-3 gap-3">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e99d0af034b3a9e659ae17d731eb4090e7b3409?width=602"
      alt={title}
      className="h-[250px] w-full object-cover rounded-xl"
    />
    <div className="flex flex-col gap-1">
      <div className="text-base font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  </div>
);

const campusDAONFT = process.env.NFT_ADDRESS;

// const campusDAONFTAbi = parseAbi([
//   "function tokenURI(uint256 tokenId) public view override returns (string memory)",
// ]);

const campusDAONFTAbi = process.env.NFT_ABI;

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();
  const user = useUser();
  const { client, address } = useSmartAccountClient({ type: "LightAccount" });
  const [NFTs, setNFTs] = useState("")

  useEffect(() => {
    (async () => {
      if (!client || !address) return;
      
      try {
        const data = await fetchNFTs(address, campusDAONFT, setNFTs)
        console.log(data);
        // const userNftIDs = await client.readContract({
        //   address: campusDAONFT,
        //   abi: campusDAONFTAbi,
        //   functionName: "tokenURI",
        //   args: [address],
        // });
        // console.log(userNftIDs);

        // const metadataList = await Promise.all(
        //   userNftIDs.map(async (tokenId) => {
        //     const tokenUri = await client.readContract({
        //       address: campusDAONFT,
        //       abi: campusDAONFTAbi,
        //       functionName: "tokenURI",
        //       args: [tokenId],
        //     });

        //     const response = await fetch(tokenUri);
        //     const metadata = await response.json();

        //     return {
        //       tokenId: tokenId.toString(),
        //       ...metadata, 
        //     };
        //   })
        // );

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    })();
  }, [client, address]);

  const handleExplorerClick = () => navigate("/projectexplorer");
  const handleYourWorksClick = () => navigate("/yourworks");
  const handleDashboardClick = () => navigate("/dashboard");
  const handleDAOClick = () => navigate("/dao");
  const handleContributionsClick = () => navigate("/contributions")

  return (
    <div className="min-h-screen bg-white font-public-sans">
      {/* Header */}
      <header className="bg-campus-bg border-b border-gray-200">
        <div className="px-10 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-gray-900">CampusDAO</h1>
              </div>
            </div>

            <div className="flex items-center">
              <nav className="hidden md:flex items-center gap-9">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDashboardClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExplorerClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors cursor-pointer"
                >
                  Projects
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleYourWorksClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors cursor-pointer"
                >
                  Your Works
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDAOClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors cursor-pointer"
                >
                  DAO
                </a>
                {/* <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContributionsClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors cursor-pointer"
                >
                  Contributions
                </a> */}
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {isConnected && (
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 md:px-40 py-5">
        <div className="max-w-6xl mx-auto">
          {/* User Profile Section */}
          <div className="flex justify-between items-center p-4">
            <div className="flex items-start gap-4">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/042/332/098/small_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg"
                alt=""
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center h-32">
                <div className="flex flex-col w-[227px]">
                  <h1 className="text-xl font-bold text-gray-900">
                    {user.email}
                  </h1>
                </div>
                <div className="flex flex-col w-[227px]">
                  <p className="text-base text-gray-500">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 p-4 flex-wrap">
            {statsData.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-start p-4">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/yourworks")}
                className="flex items-center justify-center px-4 py-2 bg-blue-400 text-gray-900 text-sm font-bold rounded-[20px] hover:bg-blue-500 transition-colors"
              >
                Start New Project
              </button>
              <button
                onClick={() => navigate("/projectexplorer")}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-900 text-sm font-bold rounded-[20px] hover:bg-gray-200 transition-colors"
              >
                Join Project
              </button>
            </div>
          </div>

          {/* NFT Badges Section */}
          <div className="flex flex-col p-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3">
              Your NFT Badges
            </h2>
          </div>

          {/* NFT Badges Grid */}
          <div className="p-4">
            <div className="flex gap-3 overflow-x-auto">
              {/* {NFT.map((nft) => (
                <NFTBadgeCard
                  key={nft.tokenId}
                  title={nft.title}
                  role={nft.role}
                />
              ))} */}
              {nftBadges.map((nft, index) => (
                <NFTBadgeCard
                  key={index}
                  title={nft.title}
                  role={nft.description}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
