import { Calendar, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";

const statsData = [
  {
    title: "Total Proposals Accepted",
    value: "12",
  },
  {
    title: "Roles Played",
    value: "3",
  },
  {
    title: "Total GitHub Commits",
    value: "250",
  },
  {
    title: "Average Contribution Percentage",
    value: "75%",
  },
];

const contributionData = [
  {
    projectName: "Project Alpha",
    role: "Developer",
    status: "Accepted",
    commits: "50",
    percentage: 75,
    joinDate: "2023-01-15",
    lastActivity: "2023-03-15",
  },
  {
    projectName: "Project Beta",
    role: "Designer",
    status: "Active",
    commits: "30",
    percentage: 60,
    joinDate: "2023-04-01",
    lastActivity: "2023-06-01",
  },
  {
    projectName: "Project Gamma",
    role: "Manager",
    status: "Rejected",
    commits: "20",
    percentage: 40,
    joinDate: "2023-07-15",
    lastActivity: "2023-09-15",
  },
  {
    projectName: "Project Delta",
    role: "Developer",
    status: "Accepted",
    commits: "70",
    percentage: 90,
    joinDate: "2023-10-01",
    lastActivity: "2023-12-01",
  },
  {
    projectName: "Project Epsilon",
    role: "Designer",
    status: "Active",
    commits: "80",
    percentage: 80,
    joinDate: "2024-01-15",
    lastActivity: "2024-03-15",
  },
];

const timelineData = [
  {
    title: "Joined Project Alpha",
    date: "2023-01-15",
  },
  {
    title: "Contributed to Project Beta",
    date: "2023-04-01",
  },
  {
    title: "Completed Project Gamma",
    date: "2023-09-15",
  },
  {
    title: "Joined Project Delta",
    date: "2023-10-01",
  },
  {
    title: "Current Activity on Project Epsilon",
    date: "2024-03-15",
  },
];

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-col p-6 gap-2 flex-1 border border-gray-300 rounded-lg min-w-[158px]">
    <div className="text-base font-medium text-gray-900">{title}</div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="flex items-center gap-3">
    <div className="w-22 bg-gray-300 rounded-sm h-1 relative">
      <div
        className="bg-campus-blue h-1 rounded-sm"
        style={{ width: `${(percentage / 100) * 100}%` }}
      />
    </div>
    <span className="text-sm font-medium text-gray-900">{percentage}</span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <div className="inline-flex items-center justify-center px-4 py-1 bg-gray-100 rounded-lg">
    <span className="text-sm font-medium text-gray-900">{status}</span>
  </div>
);

const TimelineItem = ({
  title,
  date,
  isLast = false,
}: {
  title: string;
  date: string;
  isLast?: boolean;
}) => (
  <div className="flex items-start gap-2 flex-1">
    <div className="flex flex-col items-center w-10 pt-3 gap-1">
      <Calendar className="w-6 h-6 text-gray-900" />
      {!isLast && <div className="w-0.5 h-8 bg-gray-300" />}
    </div>
    <div className="flex flex-col py-3 flex-1">
      <div className="text-base font-medium text-gray-900">{title}</div>
      <div className="text-base text-campus-text">{date}</div>
    </div>
  </div>
);

export default function Contributions() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleContributionsClick = () => {
    navigate("/contributions");
  };

  const handleExplorerClick = () => {
    navigate("/projectexplorer");
  };

  const handleDAOClick = () => {
    navigate("/dao");
  };

  const handleYourWorksClick = () => {
    navigate("/yourworks");
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
          <div className="flex flex-col items-start gap-3 p-4">
            <h1 className="text-3xl font-bold text-gray-900">Contributions</h1>
            <p className="text-sm text-campus-text">
              Track your hackathon contributions and developer portfolio
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 p-4 flex-wrap">
            {statsData.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>

          {/* Project Contributions Section */}
          <div className="flex flex-col p-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3">
              Project Contributions
            </h2>
          </div>

          {/* Project Contributions Table */}
          <div className="p-3">
            <div className="border border-gray-300 rounded-lg bg-campus-bg overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-campus-bg border-b border-gray-200">
                <div className="w-[119px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Project Name
                  </span>
                </div>
                <div className="w-[133px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Role(s)
                  </span>
                </div>
                <div className="w-[140px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Proposal Status
                  </span>
                </div>
                <div className="w-[126px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    GitHub Commits
                  </span>
                </div>
                <div className="w-[179px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Contribution Percentage
                  </span>
                </div>
                <div className="w-[110px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Join Date
                  </span>
                </div>
                <div className="w-[119px] p-3">
                  <span className="text-sm font-medium text-gray-900">
                    Last Activity
                  </span>
                </div>
              </div>

              {/* Table Body */}
              {contributionData.map((item, index) => (
                <div key={index} className="flex border-b border-gray-200 h-18">
                  <div className="w-[119px] p-2 flex items-center justify-center">
                    <span className="text-sm text-gray-900">
                      {item.projectName}
                    </span>
                  </div>
                  <div className="w-[133px] p-2 flex items-center justify-center">
                    <span className="text-sm text-campus-text">
                      {item.role}
                    </span>
                  </div>
                  <div className="w-[140px] p-2 flex items-center justify-center">
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="w-[126px] p-2 flex items-center justify-center">
                    <span className="text-sm text-campus-text">
                      {item.commits}
                    </span>
                  </div>
                  <div className="w-[179px] p-2 flex items-center justify-center">
                    <ProgressBar percentage={item.percentage} />
                  </div>
                  <div className="w-[110px] p-2 flex items-center justify-center">
                    <span className="text-sm text-campus-text">
                      {item.joinDate}
                    </span>
                  </div>
                  <div className="w-[119px] p-2 flex items-center justify-center">
                    <span className="text-sm text-campus-text">
                      {item.lastActivity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline Section */}
          <div className="flex flex-col p-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3">
              Activity Timeline
            </h2>
          </div>

          {/* Timeline */}
          <div className="px-4 pb-4">
            <div className="flex flex-col gap-2">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  date={item.date}
                  isLast={index === timelineData.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Contribution Breakdown Section */}
          <div className="flex flex-col p-4">
            <h2 className="text-xl font-bold text-gray-900 pb-3">
              Contribution Breakdown
            </h2>
          </div>

          {/* Contribution Chart Card */}
          <div className="px-6 pb-6">
            <div className="flex flex-col p-6 gap-2 border border-gray-300 rounded-lg min-w-[288px]">
              <div className="text-base font-medium text-gray-900">
                Contributions by Project
              </div>
              <div className="text-3xl font-bold text-gray-900 leading-10">
                75%
              </div>
              <div className="flex items-start gap-1">
                <span className="text-base text-campus-text">All Time</span>
                <span className="text-base font-medium text-green-600">
                  +10%
                </span>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end gap-6 min-h-[180px] px-3 pt-4">
                {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map(
                  (project, index) => {
                    const heights = [137, 110, 85, 120, 100]; // Different heights for visual variety
                    return (
                      <div
                        key={project}
                        className="flex flex-col items-end gap-6"
                      >
                        <div
                          className="flex flex-col bg-gray-100 border-t-2 border-gray-600 self-stretch"
                          style={{ height: `${heights[index]}px` }}
                        />
                        <div className="text-xs font-bold text-campus-text h-5">
                          {project}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-start p-3">
            <button className="flex items-center justify-center px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">
              Export as PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
