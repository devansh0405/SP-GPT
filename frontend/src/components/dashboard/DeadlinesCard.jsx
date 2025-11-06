import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { AlertTriangle, Clock } from "lucide-react";
import { getAssignments } from "../../services/moodleAPI";

const DeadlinesCard = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("moodleToken");
        if (!token) throw new Error("No Moodle token found. Please log in first.");

        const assignments = await getAssignments(token);

        // Filter future assignments only
        const upcoming = assignments
          .filter((a) => new Date(a.dueDate) >= new Date())
          .map((a) => ({
            id: a.id,
            title: a.name,
            type: "Assignment",
            dueDate: new Date(a.dueDate),
          }))
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        // Mark as urgent if within 3 days
        const now = new Date();
        upcoming.forEach((a) => {
          const diffDays = (new Date(a.dueDate) - now) / (1000 * 60 * 60 * 24);
          a.urgent = diffDays <= 3;
          a.timeLeft =
            diffDays < 1
              ? "Today"
              : `${Math.ceil(diffDays)} day${diffDays > 1 ? "s" : ""}`;
        });

        setDeadlines(upcoming);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, []);

  if (loading)
    return (
      <Card className="p-6 shadow-card text-center">
        <p>Loading deadlines...</p>
      </Card>
    );

  if (error)
    return (
      <Card className="p-6 shadow-card text-center">
        <p className="text-academic-danger">{error}</p>
      </Card>
    );

  if (!deadlines.length)
    return (
      <Card className="p-6 shadow-card text-center">
        <h3 className="text-lg font-semibold mb-2">Upcoming Deadlines</h3>
        <p className="text-muted-foreground text-sm">
          No upcoming deadlines found.
        </p>
      </Card>
    );

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
                  <span className="px-2 py-1 bg-academic-warning/10 text-academic-warning rounded-full">
                    {deadline.type}
                  </span>
                  <span className="text-muted-foreground">
                    {deadline.dueDate.toDateString()}
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
