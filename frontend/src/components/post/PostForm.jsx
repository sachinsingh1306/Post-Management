import { useState, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "news",
  });

  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createPost(formData);

    if (res.success) {
      alert("Post created (Pending approval)");
      navigate("/my-posts");
    } else {
      alert(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
      />

      <select name="category" onChange={handleChange}>
        <option value="news">News</option>
        <option value="entertainment">Entertainment</option>
        <option value="study">Study</option>
        <option value="fashion">Fashion</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}

export default PostForm;