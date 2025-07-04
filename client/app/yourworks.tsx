import { ChevronDown, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";
import { parseAbi, encodeFunctionData } from "viem";
import { useSmartAccountClient, useSendUserOperation } from "@account-kit/react";

const createdProjectsData = [
  {
    id: 1,
    title: "Campus Sustainability Initiative",
    tags: "Sustainability, Environment, Campus Improvement",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d7bda7857d0616083d150230093908f8b4271d6f?width=640",
  },
  {
    id: 2,
    title: "Tech Innovation Hub",
    tags: "Technology, Innovation, Student Collaboration",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2620edfacdd1cb57935ec9687ce087cf4b1ffee8?width=640",
  },
  {
    id: 3,
    title: "Arts & Culture Festival",
    tags: "Arts, Culture, Community Engagement",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0e959d16ffa941706d6d176fd25bf87f0a82079d?width=640",
  },
];

const participatedProjectsData = [
  {
    id: 4,
    title: "AI-Powered Study Assistant",
    tags: "AI, Machine Learning, Education",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6fd928d0205e25058a351eaebdd21128a86ef89f?width=618",
  },
  {
    id: 5,
    title: "Decentralized Event Management System",
    tags: "Blockchain, Events, Management",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cbeb5bd2d470f3efb0a6a98f621aa60f1ec3b0d2?width=618",
  },
  {
    id: 6,
    title: "Community Forum for Developers",
    tags: "Community, Development, Collaboration",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/719c9c5492aede1f65e465003e55181d0ba1362b?width=618",
  },
];

const ProjectCard = ({
  project,
  onViewDetails,
}: {
  project: (typeof createdProjectsData)[0];
  onViewDetails: (id: number) => void;
}) => {
  const handleProjectClick = () => {
    // Navigate to project detail page or handle project click
    console.log(`Navigating to project: ${project.title}`);
    onViewDetails(project.id);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    onViewDetails(project.id);
  };

  return (
    <div
      className="flex justify-between items-start rounded-xl overflow-hidden cursor-pointer hover:bg-gray-50 transition-all duration-200 p-2 -m-2"
      onClick={handleProjectClick}
    >
      <div className="flex-1 space-y-4 pr-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900 leading-5 hover:text-campus-blue transition-colors">
            {project.title}
          </h3>
          <div className="text-sm text-gray-500">
            Build an automated study assistant using AI
          </div>
          <div className="text-sm text-campus-text">
            Tech Stack: {project.tags}
          </div>
        </div>
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-2xl hover:bg-gray-200 transition-colors"
        >
          View Details
        </button>
      </div>
      <div className="flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-80 h-44 object-cover rounded-xl transition-transform duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

const campusDAO = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const campusDAOAbi = parseAbi([
  "function createProject(string memory title, string memory description, string memory expectations, string memory techStack, string memory githubRepo, uint256 maxMembers) public",
  "function getProjectInfo(uint256 projectId) public view returns (uint256 id, string memory title, string memory description, string memory expectations, string memory techStack, string memory githubRepo, address owner, address[] memory members, bool isActive, uint256 createdAt, uint256 maxMembers)",
  "function getUserProjects(address user) public view returns(uint256[] memory)"
]);

export default function YourWorks() {
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  const { client, address } = useSmartAccountClient({ type: "LightAccount" });
  
  const [activeTab, setActiveTab] = useState<"created" | "participated">(
    "created",
  );

  const currentProjects =
    activeTab === "created" ? createdProjectsData : participatedProjectsData;

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!client || !address) return; 
      try {
        const projects = await client.readContract({
          address: campusDAO,
          abi: campusDAOAbi,
          functionName: "getUserProjects",
          args: [address as string],
        });
        console.log(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      
    })(); 
  }, [client, address]);

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleDAOClick = () => {
    navigate("/dao");
  };

  const handleYourWorksClick = () => {
    navigate("/yourworks");
  };
  
  const handleExplorerClick = () => {
    navigate("/projectexplorer");
  };

  const handleContributionsClick = () => {
    navigate("/contributions");
  };

  const handleStartProjectClick = () => {
    navigate("/start-project");
  };

  const handleViewMyProjectDetails = (projectId: number) => {
    navigate(`/my-project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-campus-bg font-public-sans">
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

            {/* Right side - Notifications, Profile */}
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
          {/* Page Header */}
          <div className="flex justify-between items-start mb-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
            <button
              onClick={handleStartProjectClick}
              className="px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors"
            >
              Start New Project
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex items-start gap-8 px-4 border-b border-gray-300">
              <div
                className="flex flex-col items-center py-4 border-b-3 border-gray-200 cursor-pointer"
                onClick={() => setActiveTab("created")}
              >
                <span
                  className={`text-sm font-bold ${activeTab === "created" ? "text-campus-text" : "text-gray-900"}`}
                >
                  My Created Projects
                </span>
              </div>
              <div
                className="flex flex-col items-center py-4 border-b-3 border-gray-200 cursor-pointer"
                onClick={() => setActiveTab("participated")}
              >
                <span
                  className={`text-sm font-bold ${activeTab === "participated" ? "text-campus-text" : "text-gray-900"}`}
                >
                  Participated Projects
                </span>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-4 px-4">
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewDetails={handleViewMyProjectDetails}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
