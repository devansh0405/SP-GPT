import React from "react";
import { Card } from "../ui/card";
import { BookOpen, Calendar, Clock, Trophy } from "lucide-react";

const DashboardStats = ({ stats }) => {
  const items = [
    {
      title: "Active Projects",
      value: stats?.projects || 0,
      icon: BookOpen,
      color: "text-academic-secondary",
      bgColor: "bg-academic-secondary/10",
    },
    {
      title: "Pending Assignments",
      value: stats?.pendingAssignments || 0,
      icon: Calendar,
      color: "text-academic-warning",
      bgColor: "bg-academic-warning/10",
    },
    {
      title: "Due This Week",
      value: stats?.dueThisWeek || 0,
      icon: Clock,
      color: "text-academic-danger",
      bgColor: "bg-academic-danger/10",
    },
    {
      title: "Completed Tasks",
      value: stats?.completed || 0,
      icon: Trophy,
      color: "text-academic-success",
      bgColor: "bg-academic-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="p-4 shadow-card hover:shadow-academic transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
