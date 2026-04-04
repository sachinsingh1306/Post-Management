import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

function PostCard({ post }) {
  const { likePost, dislikePost } = useContext(PostContext);

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>

      <p>👍 {post.likes.length}</p>
      <p>👎 {post.dislikes.length}</p>

      <button onClick={() => likePost(post._id)}>Like</button>
      <button onClick={() => dislikePost(post._id)}>Dislike</button>
    </div>
  );
}

export default PostCard;