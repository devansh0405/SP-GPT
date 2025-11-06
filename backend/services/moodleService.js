import axios from "axios";

const MOODLE_URL = process.env.MOODLE_URL;
const SERVICE = process.env.MOODLE_SERVICE;

// 1️⃣ Get user token
export const getMoodleToken = async (username, password) => {
  const response = await axios.post(`${MOODLE_URL}/login/token.php`, null, {
    params: {
      username,
      password,
      service: SERVICE,
    },
  });

  if (response.data.error) throw new Error(response.data.error);
  return response.data.token;
};

// 2️⃣ Fetch assignments using token
export const fetchMoodleAssignments = async (token) => {
  const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
    params: {
      wstoken: token,
      wsfunction: "mod_assign_get_assignments",
      moodlewsrestformat: "json",
    },
  });

  // Format assignments cleanly for frontend
  const formatted = [];
  response.data.courses.forEach((course) => {
    course.assignments.forEach((a) => {
      formatted.push({
        id: a.id,
        name: a.name,
        course: course.fullname,
        dueDate: new Date(a.duedate * 1000),
      });
    });
  });
  return formatted;
};
