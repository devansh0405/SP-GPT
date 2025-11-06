import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FolderOpen, Plus, Clock, User } from "lucide-react";
import { Progress } from "../ui/progress";

const projects = [
  {
    id: 1,
    title: "E-Commerce Web Application",
    subject: "Web Development",
    progress: 75,
    dueDate: "Dec 15, 2024",
    members: 4,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Machine Learning Model",
    subject: "Artificial Intelligence",
    progress: 45,
    dueDate: "Dec 20, 2024",
    members: 3,
    status: "In Progress",
  },
  {
    id: 3,
    title: "Database Management System",
    subject: "DBMS",
    progress: 90,
    dueDate: "Dec 10, 2024",
    members: 2,
    status: "Review",
  },
];

const ProjectsCard = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-5 w-5 text-academic-secondary" />
          <h3 className="text-lg font-semibold">Projects</h3>
        </div>
        <Button
          size="sm"
          className="bg-academic-secondary hover:bg-academic-secondary/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{project.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {project.subject}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === "In Progress"
                    ? "bg-academic-warning/20 text-academic-warning"
                    : project.status === "Review"
                    ? "bg-academic-success/20 text-academic-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />

              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{project.members} members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectsCard;