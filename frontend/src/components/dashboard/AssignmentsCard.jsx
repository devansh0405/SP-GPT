import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { loginToMoodle, getAssignments } from "../../services/moodleAPI";

const AssignmentsCard = ({ onStatsUpdate }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("moodleToken") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🟢 Fetch assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAssignments(token);
        const savedStates = JSON.parse(localStorage.getItem("assignStates") || "{}");
        const updated = data.map((a) => ({
          ...a,
          completed: savedStates[a.id] || false,
        }));
        setAssignments(updated);
        updateStats(updated);
      } catch (err) {
        setError("Failed to fetch assignments. Please re-login.");
        localStorage.removeItem("moodleToken");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const updateStats = (list) => {
    const completed = list.filter((a) => a.completed).length;
    const pending = list.length - completed;
    const now = new Date();
    const start = new Date(now.setDate(now.getDate() - now.getDay()));
    const end = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    const dueThisWeek = list.filter((a) => {
      const d = new Date(a.dueDate);
      return d >= start && d <= end;
    }).length;

    onStatsUpdate?.({ total: list.length, pending, completed, dueThisWeek });
  };

  const handleToggle = (id) => {
    const updated = assignments.map((a) =>
      a.id === id ? { ...a, completed: !a.completed } : a
    );
    setAssignments(updated);
    const save = updated.reduce((acc, a) => ({ ...acc, [a.id]: a.completed }), {});
    localStorage.setItem("assignStates", JSON.stringify(save));
    updateStats(updated);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const fetchedToken = await loginToMoodle(username, password);
      setToken(fetchedToken);
      localStorage.setItem("moodleToken", fetchedToken);
      setError("");
    } catch (err) {
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = () => "text-academic-warning bg-academic-warning/10";

  if (!token)
    return (
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-academic-secondary" />
          <span>Moodle Login</span>
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <Button
            onClick={handleLogin}
            className="bg-academic-secondary hover:bg-academic-secondary/90 w-full"
          >
            {loading ? "Logging in..." : "Login to Moodle"}
          </Button>
          {error && <p className="text-academic-danger text-sm">{error}</p>}
        </div>
      </Card>
    );

  if (loading)
    return (
      <Card className="p-6 shadow-card text-center">
        <p>Loading assignments...</p>
      </Card>
    );

  if (!assignments.length)
    return (
      <Card className="p-6 shadow-card text-center">
        <h3 className="text-lg font-semibold mb-2">Assignments</h3>
        <p className="text-muted-foreground text-sm">
          No assignments found for the current academic year.
        </p>
      </Card>
    );

  return (
    <Card className="p-6 shadow-card h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-academic-secondary" />
          <h3 className="text-lg font-semibold">Assignments</h3>
        </div>
        <Button
          size="sm" variant="outline"
          className="text-white bg-academic-secondary hover:bg-academic-secondary/90"
          onClick={() => {
            localStorage.removeItem("moodleToken");
            setToken("");
          }}
        >
          Logout
        </Button>
      </div>

      {/* Scrollable list */}
      <div className="space-y-4 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="p-4 rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={a.completed}
                onCheckedChange={() => handleToggle(a.id)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className={`font-medium text-sm truncate ${
                      a.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {a.name}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}
                  >
                    Medium
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2 truncate">{a.course}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Due {new Date(a.dueDate).toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed summary */}
      {assignments.some((a) => a.completed) && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-sm text-muted-foreground flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-academic-success" />
            <span>
              {assignments.filter((a) => a.completed).length} completed
            </span>
          </p>
        </div>
      )}
    </Card>
  );
};

export default AssignmentsCard;
