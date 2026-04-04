import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (uid) config.headers.uid = uid;

  return config;
});

export default axiosInstance;
