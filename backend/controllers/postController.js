const Post = require("../models/Post");

// ================= CREATE POST =================

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    // 🔍 Validation
    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      user: req.user._id,
      title,
      content,
      category,
      status: "pending", // 🔥 IMPORTANT default
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET APPROVED POSTS =================

exports.getApprovedPosts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = { status: "approved" };

    if (category) {
      filter.category = category;
    }

    const posts = await Post.find(filter)
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("GET APPROVED POSTS ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET USER POSTS =================

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    console.error("GET USER POSTS ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= APPROVE POST =================

exports.approvePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "approved";
    post.adminMessage = "";

    await post.save();

    res.json({ message: "Post approved" });
  } catch (error) {
    console.error("APPROVE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= REJECT POST =================

exports.rejectPost = async (req, res) => {
  try {
    const { message } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "rejected";
    post.adminMessage = message || "Rejected by admin";

    await post.save();

    res.json({ message: "Post rejected" });
  } catch (error) {
    console.error("REJECT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LIKE POST =================

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    // Remove from dislikes
    post.dislikes = post.dislikes.filter(
      (id) => id.toString() !== userId
    );

    // Toggle like
    if (post.likes.some((id) => id.toString() === userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: "Like updated",
      likes: post.likes.length,
      dislikes: post.dislikes.length,
    });
  } catch (error) {
    console.error("LIKE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DISLIKE POST =================

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    // Remove from likes
    post.likes = post.likes.filter(
      (id) => id.toString() !== userId
    );

    // Toggle dislike
    if (post.dislikes.some((id) => id.toString() === userId)) {
      post.dislikes = post.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.dislikes.push(userId);
    }

    await post.save();

    res.json({
      message: "Dislike updated",
      likes: post.likes.length,
      dislikes: post.dislikes.length,
    });
  } catch (error) {
    console.error("DISLIKE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE POST =================

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL POSTS (ADMIN) =================

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};