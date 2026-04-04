import axiosInstance from "../utils/axiosInstance";

export const addPost = (data) => axiosInstance.post("/addpost", data);
export const getAllPosts = () => axiosInstance.get("/allpost");
export const getAcceptedPosts = () => axiosInstance.get("/getpost");

export const likePost = (id) => axiosInstance.put(`/addlike/${id}`);
export const dislikePost = (id) => axiosInstance.put(`/dislike/${id}`);
