import React from "react";
import { Card } from "../ui/card";
import { AlertTriangle, Clock } from "lucide-react";

const deadlines = [
  {
    id: 1,
    title: "Data Structures Project",
    type: "Project",
    dueDate: "Dec 12, 2024",
    timeLeft: "2 days",
    urgent: true,
  },
  {
    id: 2,
    title: "Database Management Exam",
    type: "Exam",
    dueDate: "Dec 14, 2024",
    timeLeft: "4 days",
    urgent: false,
  },
  {
    id: 3,
    title: "Network Security Assignment",
    type: "Assignment",
    dueDate: "Dec 16, 2024",
    timeLeft: "6 days",
    urgent: false,
  },
  {
    id: 4,
    title: "Web Dev Presentation",
    type: "Presentation",
    dueDate: "Dec 18, 2024",
    timeLeft: "8 days",
    urgent: false,
  },
];

const DeadlinesCard = () => {
  const urgentDeadlines = deadlines.filter((d) => d.urgent);

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-academic-danger" />
        <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
        {urgentDeadlines.length > 0 && (
          <span className="px-2 py-1 bg-academic-danger/10 text-academic-danger text-xs rounded-full">
            {urgentDeadlines.length} urgent
          </span>
        )}
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={`p-3 rounded-lg border transition-all hover:shadow-md ${
              deadline.urgent
                ? "border-academic-danger/20 bg-academic-danger/5"
                : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {deadline.urgent && (
                    <AlertTriangle className="h-3 w-3 text-academic-danger" />
                  )}
                  <h4 className="font-medium text-sm">{deadline.title}</h4>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-full font-medium ${
                      deadline.type === "Project"
                        ? "bg-academic-secondary/20 text-academic-secondary"
                        : deadline.type === "Exam"
                        ? "bg-academic-danger/20 text-academic-danger"
                        : deadline.type === "Assignment"
                        ? "bg-academic-warning/20 text-academic-warning"
                        : "bg-academic-accent/20 text-academic-accent"
                    }`}
                  >
                    {deadline.type}
                  </span>
                  <span className="text-muted-foreground">
                    {deadline.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`mt-2 text-xs font-medium ${
                deadline.urgent
                  ? "text-academic-danger"
                  : "text-muted-foreground"
              }`}
            >
              {deadline.timeLeft} remaining
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DeadlinesCard;