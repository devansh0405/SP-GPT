import { getMoodleToken, fetchMoodleAssignments } from "../services/moodleService.js";

export const loginToMoodle = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await getMoodleToken(username, password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignments = async (req, res) => {
  const { token } = req.query;

  try {
    const assignments = await fetchMoodleAssignments(token);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
