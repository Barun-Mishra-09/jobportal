import axios from "axios";

const api = axios.create({
  baseURL: "https://jobportal-3bym.onrender.com/api/v1/user",
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
