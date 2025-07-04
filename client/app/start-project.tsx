import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout, useSignerStatus } from "@account-kit/react";

interface TeamMember {
  id: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function StartProject() {
  const navigate = useNavigate();

  const { logout } = useLogout();
  const { isConnected } = useSignerStatus();

  const [formData, setFormData] = useState({
    ownerName: "",
    projectTitle: "",
    description: "",
    clearExpectations: "",
    techStack: "",
    repositoryLink: "",
    maxMembers: "",
    governanceMode: "solo", // 'solo' or 'snapshot'
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      email: "0x789...xyz",
      role: "Developer",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fb90d4c2a1ab306da516806cf829ee754d219b19?width=112",
    },
  ]);

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    email: "",
    role: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    if (newMember.email && newMember.role) {
      const member: TeamMember = {
        id: Date.now().toString(),
        email: newMember.email,
        role: newMember.role,
      };
      setTeamMembers((prev) => [...prev, member]);
      setNewMember({ email: "", role: "" });
      setShowAddMemberModal(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleCancel = () => {
    navigate("/yourworks");
  };

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log("Creating project with data:", formData);
    // Navigate back to your works page after creation
    navigate("/yourworks");
  };

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
      <main className="flex-1 px-40 py-5">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="p-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Start a Project
            </h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Owner Name */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Owner Name
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Project Title */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Project Title
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter project title"
                value={formData.projectTitle}
                onChange={(e) =>
                  handleInputChange("projectTitle", e.target.value)
                }
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Description
                </label>
              </div>
              <textarea
                placeholder="Enter project description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full min-h-36 px-4 py-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 resize-vertical focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Clear Expectations */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Clear Expectations
                </label>
              </div>
              <textarea
                placeholder="Define clear expectations for contributors"
                value={formData.clearExpectations}
                onChange={(e) =>
                  handleInputChange("clearExpectations", e.target.value)
                }
                className="w-full min-h-36 px-4 py-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 resize-vertical focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Tech Stack */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Tech Stack
                </label>
              </div>
              <input
                type="text"
                placeholder="e.g., React, Solidity, IPFS"
                value={formData.techStack}
                onChange={(e) => handleInputChange("techStack", e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Repository Link */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Repository Link
                </label>
              </div>
              <input
                type="url"
                placeholder="Enter GitHub repository URL"
                value={formData.repositoryLink}
                onChange={(e) =>
                  handleInputChange("repositoryLink", e.target.value)
                }
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Max Members Allowed */}
            <div className="max-w-lg px-4">
              <div className="pb-2">
                <label className="block text-base font-medium text-gray-900">
                  Max Members Allowed
                </label>
              </div>
              <input
                type="number"
                placeholder="Enter maximum number of team members"
                value={formData.maxMembers}
                onChange={(e) =>
                  handleInputChange("maxMembers", e.target.value)
                }
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
              />
            </div>

            {/* Governance Mode */}
            <div className="px-4 pb-2">
              <h2 className="text-lg font-bold text-gray-900">
                Governance Mode
              </h2>
            </div>

            <div className="px-4 space-y-3">
              {/* Solo Admin Option */}
              <div
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.governanceMode === "solo"
                    ? "border-campus-blue bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleInputChange("governanceMode", "solo")}
              >
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.governanceMode === "solo"
                        ? "border-campus-blue"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.governanceMode === "solo" && (
                      <div className="w-3 h-3 bg-campus-blue rounded-full absolute top-0.5 left-0.5"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Solo Admin
                  </div>
                  <div className="text-sm text-gray-600">
                    Centralized REP distribution
                  </div>
                </div>
              </div>

              {/* Snapshot DAO Option */}
              <div
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.governanceMode === "snapshot"
                    ? "border-campus-blue bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleInputChange("governanceMode", "snapshot")}
              >
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      formData.governanceMode === "snapshot"
                        ? "border-campus-blue"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.governanceMode === "snapshot" && (
                      <div className="w-3 h-3 bg-campus-blue rounded-full absolute top-0.5 left-0.5"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Snapshot DAO
                  </div>
                  <div className="text-sm text-gray-600">
                    Contributors vote on REP
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="px-4 pb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">
                  Team Members
                </h2>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors"
                >
                  Add Member
                </button>
              </div>
            </div>

            {/* Team Members List */}
            <div className="px-4 space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
                >
                  <img
                    src={
                      member.avatar ||
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/fb90d4c2a1ab306da516806cf829ee754d219b19?width=112"
                    }
                    alt="Team member"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-base font-medium text-gray-900">
                      {member.email}
                    </div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-3 px-4 py-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-bold rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Add Team Member
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email or Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter email or wallet address"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Developer, Designer, Manager"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setNewMember({ email: "", role: "" });
                }}
                className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!newMember.email || !newMember.role}
                className="px-4 py-2 bg-campus-blue text-white text-sm font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
