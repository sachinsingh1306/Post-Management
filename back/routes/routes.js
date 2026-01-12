import express from "express";
import { register, login } from "../controller/userController.js";
import {
  addpost,
  allpost,
  getpost,
  categorypost,
  postbyme,
  updatepost,
  deletepost,
  addlike,
  dislike,
} from "../controller/postController.js";
import { isLogin, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth //
router.post("/auth/register", register);
router.post("/auth/login", login);

// Post //
router.post("/posts", isLogin, addpost);
router.get("/posts", allpost);
router.get("/posts/accepted", getpost);
router.get("/posts/category/:category", categorypost);
router.get("/posts/user/:uid", isLogin, postbyme);

router.put("/posts/:id", isLogin, updatepost);
router.delete("/posts/:id", isLogin, deletepost);

router.put("/posts/like/:id", isLogin, addlike);
router.put("/posts/dislike/:id", isLogin, dislike);

// Admin //
router.put("/admin/posts/:id", isLogin, isAdmin, updatepost);

export default router;
