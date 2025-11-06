import React, { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import AcademicCalendar from "../../components/dashboard/AcademicCalendar";
import ProjectsCard from "../../components/dashboard/ProjectsCard";
import AssignmentsCard from "../../components/dashboard/AssignmentsCard";
import DeadlinesCard from "../../components/dashboard/DeadlinesCard";
import HolidaysCard from "../../components/dashboard/HolidaysCard";
import AcademicLogin from "./AcademicLogin";

const Academic = () => {
  const [stats, setStats] = useState({
    projects: 3,
    pendingAssignments: 0,
    dueThisWeek: 0,
    completed: 0,
  });

  const [moodleToken, setMoodleToken] = useState(
    localStorage.getItem("moodleToken") || ""
  );

  const handleAssignmentStats = (newStats) => {
    setStats((prev) => ({
      ...prev,
      pendingAssignments: newStats.pending,
      dueThisWeek: newStats.dueThisWeek,
      completed: newStats.completed,
    }));
  };

  if (!moodleToken) {
    return <AcademicLogin onLoginSuccess={setMoodleToken} />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <DashboardStats stats={stats} />

        {/* Calendar and Deadlines Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <AcademicCalendar />
          </div>
          <div className="space-y-6">
            <DeadlinesCard />
          </div>
        </div>

        {/* Holidays now full-width */}
        <div className="mt-8">
          <HolidaysCard />
        </div>

        {/* Projects and Assignments Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ProjectsCard />
          <AssignmentsCard onStatsUpdate={handleAssignmentStats} />
        </div>
      </main>
    </div>
  );
};

export default Academic;
