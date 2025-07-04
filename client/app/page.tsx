"use client";

import { useSignerStatus } from "@account-kit/react";
import UserInfoCard from "./components/user-info-card";
import NftMintCard from "./components/nft-mint-card";
import LoginCard from "./components/login-card";
import Header from "./components/header";
import LearnMore from "./components/learn-more";

import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./index";
import Dashboard from "./dashboard";
import ProjectExplorer from "./projectexplorer";
import Contributions from "./contributions";
import DAOManagement from "./dao-management";
import YourWorks from "./yourworks";
import StartProject from "./start-project";
import ProjectDetail from "./project-detail";
import MyProjectDetail from "./my-project-detail";

export default function Home() {
  const signerStatus = useSignerStatus();

  return (
    // <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
    //   <Header />
    //   <div className="bg-bg-main bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)]">
    //     <main className="container mx-auto px-4 py-8 h-full">
    //       {signerStatus.isConnected ? (
    //         <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
    //           <div className="flex flex-col gap-8">
    //             <UserInfoCard />
    //             <LearnMore />
    //           </div>
    //           <NftMintCard />
    //         </div>
    //       ) : (
    //         <div className="flex justify-center items-center h-full pb-[4rem]">
    //           <LoginCard />
    //         </div>
    //       )}
    //     </main>
    //   </div>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectexplorer" element={<ProjectExplorer />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/yourworks" element={<YourWorks />} />
        <Route path="/my-project/:id" element={<MyProjectDetail />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/dao" element={<DAOManagement />} />
        <Route path="/contributions" element={<Contributions />} />
      </Routes>
    </BrowserRouter>
  );
}
