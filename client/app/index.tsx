import { useNavigate } from "react-router";
import { useSignerStatus } from "@account-kit/react";
import { useAuthModal } from "@account-kit/react";
import { useSmartAccountClient } from "@account-kit/react";
import { useState } from "react";
import { useUser } from "@account-kit/react";
import { Loader2 } from "lucide-react";
import Dashboard from "./dashboard";

export default function Index() {
  const navigate = useNavigate();
  const signerStatus = useSignerStatus();

  const { openAuthModal } = useAuthModal();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const user = useUser();
  const { client, address, isLoadingClient } = useSmartAccountClient({
    type: "LightAccount",
  });

  return signerStatus.isConnected ? (
    <Dashboard />
  ) : (
    <div className="min-h-screen font-public-sans bg-campus-bg">
      {/* Hero Section */}
      <div
        className="min-h-screen flex flex-col relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.40) 100%), url('https://cdn.builder.io/api/v1/image/assets/TEMP/b65c42ebc269b2c5fc5a240173fccb971a40361c?width=780')`,
        }}
      >
        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                CampusDAO
              </h1>
              <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                Empowering university students to collaborate on projects
                through DAO-based governance.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => openAuthModal()}
              disabled={isLoggingIn}
              className="inline-flex items-center justify-center px-6 py-3 bg-campus-blue text-white font-bold text-sm rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className={cn("animate-spin -ml-1 mr-3 h-5 w-5")} />
                  Log in
                </>
              ) : (
                <>Login</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
