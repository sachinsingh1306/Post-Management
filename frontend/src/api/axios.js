import axios from "axios";

// ================= BASE URL =================

// Use env variable (best practice)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================

API.interceptors.request.use(
  (req) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      req.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Auto logout if token expired
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Logging out...");
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;