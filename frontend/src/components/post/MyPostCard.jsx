function MyPostCard({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>

      <p>Status: {post.status}</p>

      {post.status === "rejected" && (
        <p>Reason: {post.adminMessage}</p>
      )}
    </div>
  );
}

export default MyPostCard;