import { useState } from "react";
import { addPost } from "../api/postApi";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    uid: localStorage.getItem("uid"),
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    await addPost(post);
    alert("Post Sent For Review");
    navigate("/");
  };

  return (
    <div className="p-6">
      <form onSubmit={submitPost} className="max-w-md mx-auto space-y-3">

        <input name="title" placeholder="Title" className="border p-2 w-full"
          onChange={handleChange} />

        <textarea name="description" placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange} />

        <input name="category" placeholder="Category"
          className="border p-2 w-full"
          onChange={handleChange} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Post
        </button>

      </form>
    </div>
  );
};

export default CreatePost;
