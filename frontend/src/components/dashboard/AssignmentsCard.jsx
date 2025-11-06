import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const assignments = [
  {
    id: 1,
    title: "Data Structures Lab Report",
    subject: "Computer Science",
    dueDate: "Dec 12, 2024",
    priority: "High",
    completed: false,
    timeLeft: "2 days",
  },
  {
    id: 2,
    title: "Physics Problem Set #5",
    subject: "Applied Physics",
    dueDate: "Dec 14, 2024",
    priority: "Medium",
    completed: false,
    timeLeft: "4 days",
  },
  {
    id: 3,
    title: "Mathematics Assignment",
    subject: "Engineering Mathematics",
    dueDate: "Dec 8, 2024",
    priority: "Low",
    completed: true,
    timeLeft: "Completed",
  },
  {
    id: 4,
    title: "Network Security Essay",
    subject: "Computer Networks",
    dueDate: "Dec 16, 2024",
    priority: "High",
    completed: false,
    timeLeft: "6 days",
  },
];

const AssignmentsCard = () => {
  const pendingAssignments = assignments.filter((a) => !a.completed);
  const completedCount = assignments.filter((a) => a.completed).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-academic-danger bg-academic-danger/10";
      case "Medium":
        return "text-academic-warning bg-academic-warning/10";
      case "Low":
        return "text-academic-success bg-academic-success/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-academic-secondary" />
          <h3 className="text-lg font-semibold">Assignments</h3>
          <span className="px-2 py-1 bg-academic-secondary/10 text-academic-secondary text-xs rounded-full">
            {pendingAssignments.length} pending
          </span>
        </div>
        <Button size="sm" className="bg-academic-secondary hover:bg-academic-secondary/90">
          <Plus className="h-4 w-4 mr-1" />
          Add Assignment
        </Button>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className={`p-3 rounded-lg border transition-all hover:shadow-md ${
              assignment.completed ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox checked={assignment.completed} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className={`font-medium text-sm ${
                      assignment.completed ? "line-through" : ""
                    }`}
                  >
                    {assignment.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      assignment.priority
                    )}`}
                  >
                    {assignment.priority}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-2">
                  {assignment.subject}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Due {assignment.dueDate}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      assignment.completed
                        ? "text-academic-success"
                        : assignment.timeLeft === "2 days"
                        ? "text-academic-danger"
                        : "text-muted-foreground"
                    }`}
                  >
                    {assignment.completed ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>{assignment.timeLeft} left</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {completedCount > 0 && (
        <div className="mt-4 pt-3 border-t">
          <p className="text-sm text-muted-foreground flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-academic-success" />
            <span>
              {completedCount} assignment
              {completedCount > 1 ? "s" : ""} completed this week
            </span>
          </p>
        </div>
      )}
    </Card>
  );
};

export default AssignmentsCard;