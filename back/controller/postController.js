import postModel from "../models/Post.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    const post = await postModel.create({
      title,
      description,
      category,
      author: req.user._id,
    });

    res.status(201).json({ message: "Post submitted for review", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

/* GET APPROVED POSTS */
export const getApprovedPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find({ status: "approved" })
      .populate("author", "name userId");

    res.json(posts);
  } catch {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

/* ADMIN: GET ALL POSTS */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.populate("author", "name userId");
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

/* POSTS BY CURRENT USER */
export const myPosts = async (req, res) => {
  try {
    const posts = await postModel.find({ author: req.user._id });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

/* ADMIN: APPROVE POST */
export const approvePost = async (req, res) => {
  try {
    await postModel.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });
    res.json({ message: "Post approved" });
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

/* DELETE POST */
export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

/* LIKE TOGGLE */
export const toggleLike = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
      post.dislikes.pull(userId);
    }

    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

/* DISLIKE TOGGLE */
export const toggleDislike = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    const userId = req.user._id;

    if (post.dislikes.includes(userId)) {
      post.dislikes.pull(userId);
    } else {
      post.dislikes.push(userId);
      post.likes.pull(userId);
    }

    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};
