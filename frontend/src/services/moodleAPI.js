import axios from "axios";

const API_BASE = "http://localhost:3000/api/moodle";

// Login to Moodle and get token
export const loginToMoodle = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login`, { username, password });
  return res.data.token;
};

// Fetch assignments using token
export const getAssignments = async (token, batch) => {
  const res = await axios.get(`${API_BASE}/assignments`, { params: { token, batch } });
  return res.data;
};
