import { ChevronDown, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";
import { parseAbi, encodeFunctionData } from "viem";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";

const projectsData = [
  {
    id: 1,
    title: "Spriggle",
    description:
      "Building a B2C marketplace for rural producers and urban consumers.",
  },
  {
    id: 2,
    title: "EventFlow",
    description:
      "Create a decentralized platform for managing campus events for enhanced security and transparency.",
  },
  {
    id: 3,
    title: "TravelBud",
    description:
      "One stop solution for travel planning with agents",
  },
];

const FilterDropdown = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors">
    <span className="text-sm font-medium text-gray-900">{label}</span>
    <ChevronDown className="w-5 h-5 text-gray-900" />
  </div>
);

const ProjectCard = ({
  project,
  onViewProject,
}: {
  project: (typeof projectsData)[0];
  onViewProject: (id: number) => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h3
              className="text-base font-bold text-gray-900 leading-5"
              style={{ marginTop: "10px" }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {project.description}
            </p>
          </div>
          <button
            onClick={() => onViewProject(project.id)}
            className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-2xl hover:bg-gray-200 transition-colors"
          >
            View Project
          </button>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c49dcfee555039fd0d4db156c4b1694933726d9d?width=618"
            alt={project.title}
            className="w-64 h-40 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  </div>
);

const campusDAO = process.env.DAO_ADDRESS;

// const campusDAOAbi = parseAbi([
//   "function getAllProjects() external view returns (ProjectSummary[] memory)",
// ]);

// const campusDAOAbi = JSON.parse(process.env.DAO_ABI);

export default function ProjectExplorer() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  const { client, address } = useSmartAccountClient({ type: "LightAccount" });
  const [activeProjects, setActiveProjects] = useState([]);
  

  // useEffect(() => {
  //   (async () => {
  //     if (!client || !address) return;
  //     try {
  //       const projects = await client.readContract({
  //         address: campusDAO,
  //         abi: campusDAOAbi,
  //         functionName: "getAllProjects",
  //       });
  //       console.log(projects);

  //       const activeProjects = projects.filter(project => {
  //           return project.status !== "Completed";
  //       });
  //       setActiveProjects(activeProjects);
  //     } 
  //     catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   })();
  // }, [client, address]);

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

  const handleViewProject = (projectId: number) => {
    navigate(`/project/${projectId}`);
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Project Explorer
            </h1>
            <p className="text-sm text-campus-text">
              Explore open projects and find opportunities to contribute to the
              CampusDAO community.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewProject={handleViewProject}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
