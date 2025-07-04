import { useNavigate, useParams } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";

// Mock project data - in a real app, this would come from an API
const projectData = {
  1: {
    title: "CampusConnect",
    description:
      "A platform connecting students with campus resources and events.",
    fullDescription:
      "Develop a mobile app to streamline access to campus services and activities.",
    expectations:
      "Successful launch of the app with positive user feedback and high adoption rates.",
    techStack: "React Native, Node.js, PostgreSQL",
    owner: "Ethan Harper",
    maxMembers: "5",
    members: [
      { name: "Ethan Harper", role: "Project Lead", rep: "120" },
      { name: "Olivia Bennett", role: "UI/UX Designer", rep: "95" },
      { name: "Noah Carter", role: "Frontend Developer", rep: "110" },
    ],
    contributions: [
      { contributor: "Ethan Harper", commits: "52" },
      { contributor: "Olivia Bennett", commits: "12" },
      { contributor: "Noah Carter", commits: "45" },
    ],
  },
  // Add more projects as needed
};

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  // Get project data - fallback to project 1 if id not found
  const project = projectData[id as keyof typeof projectData] || projectData[1];

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

  const handleJoinRequest = () => {
    // Handle join/request logic
    console.log("Join/Request project");
  };

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
      <main className="px-40 py-5">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="p-4 mb-6">
            <div className="min-w-72 space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Project Overview Section */}
          <div className="px-4 pb-3">
            <h2 className="text-xl font-bold text-gray-900">
              Project Overview
            </h2>
          </div>

          <div className="px-4">
            {/* Project Details Table */}
            <div className="border border-gray-300 rounded-xl bg-white overflow-hidden">
              {/* Project Title Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">Project Title</span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">{project.title}</span>
                </div>
              </div>

              {/* Description Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">Description</span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">
                    {project.fullDescription}
                  </span>
                </div>
              </div>

              {/* Expectations Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">Expectations</span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">
                    {project.expectations}
                  </span>
                </div>
              </div>

              {/* Tech Stack Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">Tech Stack</span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">
                    {project.techStack}
                  </span>
                </div>
              </div>

              {/* Owner Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">Owner</span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">{project.owner}</span>
                </div>
              </div>

              {/* Max Members Row */}
              <div className="flex">
                <div className="w-48 px-4 py-5 bg-gray-50">
                  <span className="text-sm text-gray-600">
                    Max Members Allowed
                  </span>
                </div>
                <div className="flex-1 px-4 py-5">
                  <span className="text-sm text-gray-900">
                    {project.maxMembers}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Members with Roles Section */}
          <div className="px-4 py-5 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Members with Roles
            </h2>
          </div>

          <div className="px-4 mb-8">
            <div className="border border-gray-300 rounded-xl bg-white overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-gray-50 border-b border-gray-200">
                <div className="flex-1 px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    Name
                  </span>
                </div>
                <div className="flex-1 px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    Role
                  </span>
                </div>
                <div className="flex-1 px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">REP</span>
                </div>
              </div>

              {/* Table Rows */}
              {project.members.map((member, index) => (
                <div
                  key={index}
                  className="flex border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-1 px-4 py-4">
                    <span className="text-sm text-gray-900">{member.name}</span>
                  </div>
                  <div className="flex-1 px-4 py-4">
                    <span className="text-sm text-gray-600">{member.role}</span>
                  </div>
                  <div className="flex-1 px-4 py-4">
                    <span className="text-sm text-gray-600">{member.rep}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Log Section */}
          <div className="px-4 py-5">
            <h2 className="text-xl font-bold text-gray-900">
              Contribution Log
            </h2>
          </div>

          <div className="px-4 mb-8">
            <div className="border border-gray-300 rounded-xl bg-white overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-gray-50 border-b border-gray-200">
                <div className="flex-1 px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    Contributor
                  </span>
                </div>
                <div className="flex-1 px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    Commits
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              {project.contributions.map((contribution, index) => (
                <div
                  key={index}
                  className="flex border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-1 px-4 py-4">
                    <span className="text-sm text-gray-900">
                      {contribution.contributor}
                    </span>
                  </div>
                  <div className="flex-1 px-4 py-4">
                    <span className="text-sm text-gray-600">
                      {contribution.commits}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join/Request Button */}
          <div className="px-4 py-3 flex justify-end">
            <button
              onClick={handleJoinRequest}
              className="px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors"
            >
              Join Request
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
