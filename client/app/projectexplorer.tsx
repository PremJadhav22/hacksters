import { ChevronDown, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";

const projectsData = [
  {
    id: 1,
    title: "AI-Powered Study Assistant",
    description:
      "Develop an AI-driven study tool to help students with research, note-taking, and exam preparation. This project aims to leverage machine learning to personalize the learning experience.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6fd928d0205e25058a351eaebdd21128a86ef89f?width=618",
  },
  {
    id: 2,
    title: "Decentralized Event Management System",
    description:
      "Create a decentralized platform for managing campus events, including scheduling, ticketing, and attendance tracking. The system will utilize blockchain technology for enhanced security and transparency.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cbeb5bd2d470f3efb0a6a98f621aa60f1ec3b0d2?width=618",
  },
  {
    id: 3,
    title: "Collaborative Coding Environment",
    description:
      "Build a collaborative coding environment that allows multiple developers to work on the same project simultaneously. The platform will support real-time code editing, version control, and integrated communication tools.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c49dcfee555039fd0d4db156c4b1694933726d9d?width=618",
  },
  {
    id: 4,
    title: "Open Source Project Tracker",
    description:
      "Design a tool to track contributions to open-source projects, providing a centralized view of progress, issues, and pull requests. This project will help developers manage their contributions and identify new opportunities.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c0cc1e2821fca5199fd9aa7c5bd61d8470e85d88?width=618",
  },
  {
    id: 5,
    title: "Community Forum for Developers",
    description:
      "Develop a forum for developers to discuss projects, share knowledge, and collaborate on solutions. The forum will feature categories for different technologies, project types, and skill levels.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/719c9c5492aede1f65e465003e55181d0ba1362b?width=618",
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
  onViewProject 
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
            src={project.image}
            alt={project.title}
            className="w-64 h-40 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  </div>
);

export default function ProjectExplorer() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContributionsClick();
                  }}
                  className="text-sm text-gray-900 hover:text-campus-blue transition-colors cursor-pointer"
                >
                  Contributions
                </a>
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
