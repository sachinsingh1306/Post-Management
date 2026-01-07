import express from "express";

import {
  register,
  login,
  islogin,
  isadmin,
} from "../controller/userControler.js";

import {
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
} from "../controller/postControler.js";

const routes = express.Router();

/* ================= USER ROUTES ================= */
routes.post("/register", register);
routes.post("/login", login);

/* ================= POST ROUTES ================= */
routes.post("/post", islogin, addpost);
routes.get("/posts", allpost);
routes.get("/posts/accepted", getpost);
routes.get("/posts/category/:categorypost", categorypost);
routes.get("/posts/user/:uid", islogin, postbyme);

routes.put("/post/update", islogin, editpost);
routes.delete("/post/:_id", islogin, deletepost);

/* ================= LIKE / DISLIKE ================= */
routes.put("/post/like", islogin, addlike);
routes.put("/post/dislike", islogin, dislike);

/* ================= ADMIN ROUTES ================= */
routes.put("/admin/post/update", islogin, isadmin, updatepost);

export default routes;
