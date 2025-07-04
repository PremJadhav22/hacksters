# CampusDAO

CampusDAO is a platform designed to streamline **contribution tracking, project management, and decentralized governance** for hackathon projects. It leverages modern web3 technologies to make onboarding and participation seamless for both crypto-native and non-crypto users.

---

## Features

- **Project Explorer:** Browse and discover hackathon projects.
- **Project Creation:** Users can create new projects, which are instantly listed for others to view and join.
- **Join Requests & DAO Formation:**
  - Users can request to join projects.
  - Project owners approve join requests.
  - When a third member requests to join, existing members vote to decide their inclusion.
  - Upon approval, a DAO is created for the project.
- **Decentralized Voting:** DAO members can vote on new join requests and proposals.
- **NFT Contribution Badges:**
  - NFTs are minted for contributors after proposal deadlines.
  - NFT distribution is based on GitHub repository contribution tracking.
  - Users can view their NFTs on their personal dashboard.
- **Contribution Tracking:** Transparent tracking of all project contributions.
- **Voting History:** View all past votes and decisions within the DAO.
- **My Projects:** Users can view and manage their own projects.
- **Account Abstraction:** Social login and smart accounts for easy onboarding.
- **Gas Sponsorship:** Onboarding for non-crypto users without requiring them to pay gas fees.
- **Modern UI:** Built with React and Tailwind CSS for a clean, responsive experience.

---

## Tech Stack

| Technology         | Purpose                                                |
|--------------------|--------------------------------------------------------|
| React              | Frontend framework                                     |
| Tailwind CSS       | UI styling                                             |
| Alchemy SDK        | Blockchain interactions                                |
| Account Abstraction| Social login, smart accounts, gasless onboarding       |
| GitHub API         | Contribution tracking                                  |

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

    git clone https://github.com/PremJadhav22/hacksters.git
    cd hacksters
    cd client
    npm install
    

### Running the App

    npm run dev

The app will be available at `http://localhost:3000`.

---

## Project Workflow

1. **Create Project:** User creates a new project, which appears in the Project Explorer.
2. **Join Request:** Other users can request to join the project.
3. **Approval & DAO Creation:** Owner approves requests; DAO is created when the third member joins (after a vote by existing members).
4. **Contribution Phase:** Members collaborate and contribute via GitHub.
5. **Proposal Deadline:** After the deadline, NFTs are minted for contributors based on tracked contributions.
6. **NFT Dashboard:** Contributors can view their NFTs on their dashboard.
7. **DAO Governance:** Members can vote on proposals and new join requests.
8. **Contribution & Voting History:** All actions are transparently tracked and viewable.

---

## Key Screens

- **Project Explorer:** Browse all projects.
- **Project Details:** View project info, members, and join requests.
- **DAO Page:** Vote on proposals, view voting history.
- **Contribution Tracking:** See individual and team contributions.
- **My Projects:** Manage your own projects.
- **User Dashboard:** View earned NFTs and participation stats.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alchemy SDK](https://docs.alchemy.com/)
- [GitHub API](https://docs.github.com/en/rest)
- [EIP-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)

---

*Empowering campus innovation through decentralized collaboration and transparent contribution tracking.*