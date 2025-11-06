import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BookOpen } from "lucide-react";
import { loginToMoodle } from "../../services/moodleAPI";

const AcademicLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await loginToMoodle(username, password);
      localStorage.setItem("moodleToken", token);
      setError("");
      onLoginSuccess(token);
    } catch (err) {
      setError("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center">
      <Card className="p-8 shadow-card w-[400px]">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-academic-secondary" />
          <span>Moodle Login</span>
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Moodle Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="password"
            placeholder="Moodle Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <Button
            onClick={handleLogin}
            className="bg-academic-secondary hover:bg-academic-secondary/90 w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {error && <p className="text-academic-danger text-sm">{error}</p>}
        </div>
      </Card>
    </div>
  );
};

export default AcademicLogin;
