import { v4 as uuidv4 } from "uuid";
import postModel from "../models/postModel.js";

/* ADD POST */
export const addpost = async (req, res) => {
  try {
    const post = new postModel({ ...req.body, _id: uuidv4() });
    await post.save();
    res.status(201).json({ message: "Post sent for review" });
  } catch (error) {
    res.status(500).json({ message: "Error adding post" });
  }
};

/* GET ALL POSTS */
export const allpost = async (req, res) => {
  const posts = await postModel.find();
  res.json(posts);
};

/* GET ACCEPTED POSTS */
export const getpost = async (req, res) => {
  const posts = await postModel.find({ status: "Accepted" });
  res.json(posts);
};

/* GET POSTS BY CATEGORY */
export const categorypost = async (req, res) => {
  const posts = await postModel.find({
    category: req.params.category,
    status: "Accepted",
  });
  res.json(posts);
};

/* GET POSTS BY USER */
export const postbyme = async (req, res) => {
  const posts = await postModel.find({ uid: req.params.uid });
  res.json(posts);
};

/* UPDATE POST */
export const updatepost = async (req, res) => {
  await postModel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Post Updated" });
};

/* DELETE POST */
export const deletepost = async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};

/* LIKE POST */
export const addlike = async (req, res) => {
  await postModel.findByIdAndUpdate(req.params.id, {
    $addToSet: { likes: req.headers.uid },
    $pull: { dislikes: req.headers.uid },
  });
  res.json({ message: "Liked" });
};

/* DISLIKE POST */
export const dislike = async (req, res) => {
  await postModel.findByIdAndUpdate(req.params.id, {
    $addToSet: { dislikes: req.headers.uid },
    $pull: { likes: req.headers.uid },
  });
  res.json({ message: "Disliked" });
};
