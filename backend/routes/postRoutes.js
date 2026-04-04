const express = require("express");
const router = express.Router();

const {
  createPost,
  getApprovedPosts,
  getUserPosts,
  approvePost,
  rejectPost,
  likePost,
  dislikePost,
  deletePost,
} = require("../controllers/postController");

const { protect, admin } = require("../middleware/authMiddleware");

// Public
router.get("/", getApprovedPosts);

// User
router.post("/", protect, createPost);
router.get("/my-posts", protect, getUserPosts);

// Admin
router.put("/approve/:id", protect, admin, approvePost);
router.put("/reject/:id", protect, admin, rejectPost);
router.delete("/:id", protect, admin, deletePost);

// Like / Dislike
router.put("/like/:id", protect, likePost);
router.put("/dislike/:id", protect, dislikePost);

module.exports = router;