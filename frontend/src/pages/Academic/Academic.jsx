import React from 'react'
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import AcademicCalendar from "../../components/dashboard/AcademicCalendar";
import ProjectsCard from "../../components/dashboard/ProjectsCard";
import AssignmentsCard from "../../components/dashboard/AssignmentsCard";
import DeadlinesCard from "../../components/dashboard/DeadlinesCard";
import HolidaysCard from "../../components/dashboard/HolidaysCard";

const Academic = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <DashboardStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Academic Calendar - Full width on mobile, spans 2 cols on desktop */}
          <div className="lg:col-span-2">
            <AcademicCalendar />
          </div>

          {/* Side Cards */}
          <div className="space-y-6">
            <DeadlinesCard />
            <HolidaysCard />
          </div>
        </div>

        {/* Projects and Assignments Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ProjectsCard />
          <AssignmentsCard />
        </div>
      </main>
    </div>
  );
};

export default Academic;

