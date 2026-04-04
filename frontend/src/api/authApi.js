import axiosInstance from "../utils/axiosInstance";

export const registerUser = (data) => {
  return axiosInstance.post("/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/login", data);
};
