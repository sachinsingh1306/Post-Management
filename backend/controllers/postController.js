const Post = require("../models/Post");

// ✅ Create Post (User)
exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const post = await Post.create({
      user: req.user._id,
      title,
      content,
      category,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Approved Posts (Public - Homepage)
exports.getApprovedPosts = async (req, res) => {
  try {
    const category = req.query.category;

    let filter = { status: "approved" };

    // if category is provided
    if (category) {
      filter.category = category;
    }

    const posts = await Post.find(filter)
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Logged-in User Posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin Approve Post
exports.approvePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.status = "approved";
    post.adminMessage = "";

    await post.save();

    res.json({ message: "Post approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Admin Reject Post
exports.rejectPost = async (req, res) => {
  try {
    const { message } = req.body;

    const post = await Post.findById(req.params.id);

    post.status = "rejected";
    post.adminMessage = message;

    await post.save();

    res.json({ message: "Post rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👍 Like Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const userId = req.user._id;

    // remove from dislikes if exists
    post.dislikes = post.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // check if already liked
    if (post.likes.includes(userId)) {
      // remove like (toggle)
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ message: "Like updated", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👎 Dislike Post
exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const userId = req.user._id;

    // remove from likes if exists
    post.likes = post.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // check if already disliked
    if (post.dislikes.includes(userId)) {
      // remove dislike (toggle)
      post.dislikes = post.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.dislikes.push(userId);
    }

    await post.save();

    res.json({
      message: "Dislike updated",
      dislikes: post.dislikes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete Post (Admin)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};