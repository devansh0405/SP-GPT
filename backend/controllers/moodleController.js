import { getMoodleToken, fetchMoodleAssignments } from "../services/moodleService.js";

// ✅ Login to Moodle and get token
export const loginToMoodle = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await getMoodleToken(username, password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Fetch assignments only for current academic year (July–June)
export const getAssignments = async (req, res) => {
  const { token } = req.query;

  try {
    const assignments = await fetchMoodleAssignments(token);

    // Determine current academic year (July–June)
    const now = new Date();
    const year = now.getFullYear();
    const startYear = now.getMonth() >= 6 ? year : year - 1; // if July or later → new year
    const endYear = startYear + 1;

    const startDate = new Date(`${startYear}-07-01`);
    const endDate = new Date(`${endYear}-06-30`);

    // Filter assignments by academic year
    const filtered = assignments.filter((a) => {
      const due = new Date(a.dueDate);
      return due >= startDate && due <= endDate;
    });

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: error.message });
  }
};
