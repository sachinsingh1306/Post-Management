import { useEffect, useContext } from "react";
import { PostContext } from "../../context/PostContext";

function AdminDashboard() {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  const total = posts.length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const approved = posts.filter((p) => p.status === "approved").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Total Posts: {total}</p>
      <p>Pending: {pending}</p>
      <p>Approved: {approved}</p>
      <p>Rejected: {rejected}</p>
    </div>
  );
}

export default AdminDashboard;