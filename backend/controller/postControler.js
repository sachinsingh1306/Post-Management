import { v4 } from "uuid";
import postModel from "../models/postModel.js";

const addpost = async (req, res) => {
  try {
    const data = postModel({ ...req.body, _id: v4() });
    await data.save();
    res.json({ messsage: "Post sent for review" });
  } catch (error) {
    res.json({ message: "Error in adding the post !" });
  }
};

const allpost = async (req, res) => {
  try {
    const data = await postModel.find();
    res.json(data);
  } catch (error) {
    res.json({ message: "Unable to fetch the data" });
  }
};

const getpost = async (req, res) => {
  try {
    const data = await postModel.find({ status: "Accepted" });
    res.json(data);
  } catch (error) {
    res.json({ message: "Error in getting post." });
  }
};

const categorypost = async (req, res) => {
  try {
    const data = await postModel.find({
      category: req.params.categorypost,
      status: "Accepted",
    });
    res.json(data);
  } catch (error) {
    res.json({ message: "Error in getting post." });
  }
};

const postbyme = async (req, res) => {
  try {
    const data = await postModel.find({ uid: req.params.uid });
    res.json(data);
  } catch (error) {
    res.json({ message: "Unable to fetch" });
  }
};

const updatepost = async (req, res) => {
  try {
    await postModel.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.json({ message: "Updation done" });
  } catch (error) {
    res.json({ message: "Error in updation post." });
  }
};

const deletepost = async (req, res) => {
  try {
    await postModel.findByIdAndDelete({ _id: req.params._id }, req.body);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.json({ message: "Error in updation post." });
  }
};

const editpost = async (req, res) => {
  try {
    await postModel.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.json({ message: "Updation done" });
  } catch (error) {
    res.json({ message: "Post not updated" });
  }
};

const addlike = async (req, res) => {
  try {
    const a = await postModel.find({
      _id: req.body._id,
      dlikes: { $in: [req.body.uid] },
    });
    if (a.length == 0) {
      await postModel.findByIdAndUpdate(
        { _id: req.body._id },
        { $addToSet: { likes: req.body.uid } }
      );
    }
    res.json({ message: "Liked" });
  } catch (error) {
    res.json({ message: "Oop's can't like" });
  }
};

const dislike = async (req, res) => {
  try {
    const a = await postModel.find({
      _id: req.body._id,
      likes: { $in: [req.body.uid] },
    });
    if (a.length == 0) {
      await postModel.findByIdAndUpdate(
        { _id: req.body._id },
        { $addToSet: { dlikes: req.body.uid } }
      );
    }
    res.json({ message: "Dislike" });
  } catch (error) {
    res.json({ message: "Oop's can't dislike post" });
  }
};

export {
  addpost,
  allpost,
  getpost,
  categorypost,
  postbyme,
  updatepost,
  deletepost,
  editpost,
  addlike,
  dislike,
};
