import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

function AdminPostTable({ posts }) {
  const { approvePost, rejectPost, deletePost } = useContext(PostContext);

  const handleReject = (id) => {
    const message = prompt("Enter rejection reason:");
    if (message) {
      rejectPost(id, message);
    }
  };

  return (
    <div>
      <h2>All Posts</h2>

      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Status: {post.status}</p>
          <p>User: {post.user?.name}</p>

          <button onClick={() => approvePost(post._id)}>Approve</button>

          <button onClick={() => handleReject(post._id)}>Reject</button>

          <button onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPostTable;