import { useNavigate, useParams } from "react-router-dom";
import { Bell, Calendar } from "lucide-react";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";

// Mock project data - in a real app, this would come from an API
const myProjectData = {
  1: {
    title: "CampusConnect",
    description:
      "CampusConnect aims to streamline access to campus information, offering a centralized hub for events, resources, and announcements. This project seeks to enhance student engagement and improve communication within the university community.",
    expectations:
      "We expect contributors to actively participate in development sprints, adhere to coding standards, and collaborate effectively within the team. Regular updates and commitment to deadlines are crucial for the project's success.",
    techStack:
      "The project will utilize React for the frontend, Node.js with Express for the backend, and MongoDB for the database. Familiarity with these technologies is preferred, but we welcome contributors eager to learn and adapt.",
    timeline: [
      {
        title: "Project Kickoff",
        date: "June 1, 2024",
      },
      {
        title: "Midterm Review",
        date: "July 15, 2024",
      },
      {
        title: "Final Release",
        date: "August 30, 2024",
      },
    ],
  },
  2: {
    title: "Tech Innovation Hub",
    description:
      "A comprehensive platform designed to foster innovation and collaboration among tech enthusiasts on campus. This project provides tools and resources for students to work together on cutting-edge technology projects.",
    expectations:
      "Contributors should demonstrate strong technical skills, creative problem-solving abilities, and excellent communication skills. We value commitment to project goals and willingness to mentor newer team members.",
    techStack:
      "Built with Vue.js for the frontend, Python Django for the backend, and PostgreSQL for data management. Experience with cloud platforms like AWS is a plus.",
    timeline: [
      {
        title: "Planning Phase",
        date: "May 15, 2024",
      },
      {
        title: "Development Sprint",
        date: "June 30, 2024",
      },
      {
        title: "Beta Launch",
        date: "August 15, 2024",
      },
    ],
  },
  3: {
    title: "Arts & Culture Festival",
    description:
      "An immersive digital platform celebrating campus arts and culture through virtual exhibitions, interactive performances, and community engagement features. This project bridges traditional arts with modern technology.",
    expectations:
      "We seek creative individuals passionate about arts and technology. Team members should be collaborative, detail-oriented, and committed to delivering high-quality user experiences.",
    techStack:
      "Developed using React with Three.js for 3D interactions, Node.js backend with GraphQL, and Firebase for real-time features. Knowledge of 3D modeling and AR/VR is beneficial.",
    timeline: [
      {
        title: "Concept Development",
        date: "April 20, 2024",
      },
      {
        title: "Prototype Testing",
        date: "June 10, 2024",
      },
      {
        title: "Festival Launch",
        date: "September 5, 2024",
      },
    ],
  },
};

export default function MyProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  // Get project data - fallback to project 1 if id not found
  const project =
    myProjectData[id as keyof typeof myProjectData] || myProjectData[1];

  const handleExplorerClick = () => {
    navigate("/projectexplorer");
  };

  const handleYourWorksClick = () => {
    navigate("/yourworks");
  };

  const handleProfileClick = () => {
    // Navigate to profile page when implemented
    console.log("Navigate to profile");
  };

  const handleGoBack = () => {
    navigate("/yourworks");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-public-sans">
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
      <main className="px-40 py-5">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="p-4 flex items-center gap-2 flex-wrap">
            <span className="text-base text-campus-blue cursor-pointer hover:text-blue-800">
              Your Works
            </span>
            <span className="text-base text-campus-blue">/</span>
            <span className="text-base text-gray-900">{project.title}</span>
          </div>

          {/* Project Title */}
          <div className="px-4 py-4 h-18 flex items-start">
            <div className="min-w-72 space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Project Description Section */}
          <div className="px-4 py-4 pb-2">
            <h2 className="text-lg font-bold text-gray-900">
              Project Description
            </h2>
          </div>
          <div className="px-4 py-1 pb-3">
            <p className="text-base text-gray-900 leading-6">
              {project.description}
            </p>
          </div>

          {/* Expectations Section */}
          <div className="px-4 py-4 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Expectations</h2>
          </div>
          <div className="px-4 py-1 pb-3">
            <p className="text-base text-gray-900 leading-6">
              {project.expectations}
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="px-4 py-4 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Tech Stack</h2>
          </div>
          <div className="px-4 py-1 pb-3">
            <p className="text-base text-gray-900 leading-6">
              {project.techStack}
            </p>
          </div>

          {/* Timeline Section */}
          <div className="px-4 py-4 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Timeline</h2>
          </div>

          <div className="px-4 py-0 space-y-2">
            {project.timeline.map((milestone, index) => (
              <div key={index} className="flex items-start gap-2">
                {/* Timeline Icon and Line */}
                <div className="flex flex-col items-center w-10 pt-3 gap-1">
                  <div className="flex flex-col items-center">
                    <Calendar className="w-6 h-6 text-gray-900" />
                  </div>
                  {index < project.timeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 py-3">
                  <div className="space-y-0">
                    <h3 className="text-base font-medium text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="text-base text-campus-blue">
                      {milestone.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Go Back Button */}
          <div className="px-4 py-3 mt-4">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-200 text-gray-900 text-sm font-bold rounded-2xl hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
