import { createContext, useState } from "react";
import API from "../api/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= CREATE POST =================

  const createPost = async (formData) => {
    try {
      const res = await API.post("/posts", formData);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error creating post",
      };
    }
  };

  // ================= GET APPROVED POSTS =================

  const getApprovedPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("GET POSTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= GET MY POSTS =================

  const getMyPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts/my-posts");
      setMyPosts(res.data);
    } catch (error) {
      console.error("MY POSTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LIKE =================

  const likePost = async (id) => {
    try {
      const res = await API.put(`/posts/like/${id}`);

      // 🔥 Optimistic update (no refetch)
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                likes: Array(res.data.likes).fill(0),
                dislikes: Array(res.data.dislikes).fill(0),
              }
            : post
        )
      );

      return { success: true };
    } catch (error) {
      console.error("LIKE ERROR:", error);
      return { success: false };
    }
  };

  // ================= DISLIKE =================

  const dislikePost = async (id) => {
    try {
      const res = await API.put(`/posts/dislike/${id}`);

      setPosts((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                likes: Array(res.data.likes).fill(0),
                dislikes: Array(res.data.dislikes).fill(0),
              }
            : post
        )
      );

      return { success: true };
    } catch (error) {
      console.error("DISLIKE ERROR:", error);
      return { success: false };
    }
  };

  // ================= ADMIN =================

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/posts/all");
      setPosts(res.data);
    } catch (error) {
      console.error("ADMIN GET POSTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const approvePost = async (id) => {
    try {
      await API.put(`/posts/approve/${id}`);

      // 🔥 instant UI update
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, status: "approved" } : post
        )
      );

      return { success: true };
    } catch (error) {
      console.error("APPROVE ERROR:", error);
      return { success: false };
    }
  };

  const rejectPost = async (id, message) => {
    try {
      await API.put(`/posts/reject/${id}`, {
        message, // ✅ FIXED
      });

      setPosts((prev) =>
        prev.map((post) =>
          post._id === id
            ? { ...post, status: "rejected", adminMessage: message }
            : post
        )
      );

      return { success: true };
    } catch (error) {
      console.error("REJECT ERROR:", error);
      return { success: false };
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`);

      // 🔥 instant removal
      setPosts((prev) => prev.filter((post) => post._id !== id));

      return { success: true };
    } catch (error) {
      console.error("DELETE ERROR:", error);
      return { success: false };
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        myPosts,
        loading,
        createPost,
        getApprovedPosts,
        getMyPosts,
        likePost,
        dislikePost,
        getAllPosts,
        approvePost,
        rejectPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};