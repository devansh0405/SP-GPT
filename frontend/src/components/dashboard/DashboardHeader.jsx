import React from "react";
import { GraduationCap, Bell, Settings, User } from "lucide-react";
import { Button } from "../ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-card border-b shadow-card">
      <div className="container mx-auto px-4 py-4">
        {/*<div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SP-GPT
              </h1>
              <p className="text-sm text-muted-foreground">
                Sardar Patel Institute Of Technology
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>*/}

        {/* Welcome Message */}
        <div className="mt-1 p-4 rounded-lg overflow-hidden shadow-md"
            style={{
            background: "linear-gradient(90deg, #8e54e9 0%, #e97c35 100%)",
            }}
        >
          <h2 className="text-lg font-semibold text-white">
            Welcome back, Student! 📚
          </h2>
          <p className="text-white/90 text-sm mt-1">
            Track your academic progress and stay on top of your goals.
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;