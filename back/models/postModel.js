import mongooes from "mongoose";

const postSchema = new mongooes.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    text: { type: String, required: true },
    username: { type: String, required: true },
    uid: { type: String, required: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const postModel = mongooes.model("Post", postSchema);
export default postModel;
