import axios from "axios";

const MOODLE_URL = process.env.MOODLE_URL;
const SERVICE = process.env.MOODLE_SERVICE;

// 🔹 Get Moodle Token
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

// 🔹 Fetch all assignments from Moodle
export const fetchMoodleAssignments = async (token) => {
  const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
    params: {
      wstoken: token,
      wsfunction: "mod_assign_get_assignments",
      moodlewsrestformat: "json",
    },
  });

  const courses = response.data.courses || [];

  const formatted = courses.flatMap((course) =>
    course.assignments.map((a) => ({
      id: a.id,
      name: a.name,
      course: course.fullname,
      dueDate: new Date(a.duedate * 1000).toISOString(),
    }))
  );

  return formatted;
};
