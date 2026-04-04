import express from "express";
import { register, login } from "../controller/authController.js";

import {
  createPost,
  getApprovedPosts,
  getAllPosts,
  myPosts,
  approvePost,
  deletePost,
  toggleLike,
  toggleDislike,
} from "../controller/postController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* AUTH */
router.post("/auth/register", register);
router.post("/auth/login", login);

/* POSTS (USER) */
router.post("/posts", protect, createPost);
router.get("/posts", getApprovedPosts);
router.get("/posts/me", protect, myPosts);

router.put("/posts/:id/like", protect, toggleLike);
router.put("/posts/:id/dislike", protect, toggleDislike);

router.delete("/posts/:id", protect, deletePost);

/* POSTS (ADMIN) */
router.get("/admin/posts", protect, adminOnly, getAllPosts);
router.put("/admin/posts/:id/approve", protect, adminOnly, approvePost);

export default router;
