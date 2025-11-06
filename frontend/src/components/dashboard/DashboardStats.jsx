import React from "react";
import { Card } from "../ui/card";
import { BookOpen, Calendar, Clock, Trophy } from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "8",
    icon: BookOpen,
    color: "text-academic-secondary",
    bgColor: "bg-academic-secondary/10",
  },
  {
    title: "Pending Assignments",
    value: "12",
    icon: Calendar,
    color: "text-academic-warning",
    bgColor: "bg-academic-warning/10",
  },
  {
    title: "Due This Week",
    value: "5",
    icon: Clock,
    color: "text-academic-danger",
    bgColor: "bg-academic-danger/10",
  },
  {
    title: "Completed Tasks",
    value: "24",
    icon: Trophy,
    color: "text-academic-success",
    bgColor: "bg-academic-success/10",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="p-4 shadow-card hover:shadow-academic transition-shadow"
          >
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