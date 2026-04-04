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
  getAllPosts,
} = require("../controllers/postController");

const { protect, admin } = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// @route   GET /api/posts
// @desc    Get all approved posts
// @access  Public
router.get("/", getApprovedPosts);

// ================= USER ROUTES =================

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post("/", protect, createPost);

// @route   GET /api/posts/my-posts
// @desc    Get logged-in user's posts
// @access  Private
router.get("/my-posts", protect, getUserPosts);

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", protect, likePost);

// @route   PUT /api/posts/dislike/:id
// @desc    Dislike a post
// @access  Private
router.put("/dislike/:id", protect, dislikePost);

// ================= ADMIN ROUTES =================

// @route   GET /api/posts/all
// @desc    Get all posts (admin)
// @access  Admin
router.get("/all", protect, admin, getAllPosts);

// @route   PUT /api/posts/approve/:id
// @desc    Approve post
// @access  Admin
router.put("/approve/:id", protect, admin, approvePost);

// @route   PUT /api/posts/reject/:id
// @desc    Reject post
// @access  Admin
router.put("/reject/:id", protect, admin, rejectPost);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Admin
router.delete("/:id", protect, admin, deletePost);

module.exports = router;