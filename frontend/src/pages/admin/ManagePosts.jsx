import { useEffect, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import AdminPostTable from "../../components/admin/AdminPostTable";

function ManagePosts() {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <h1>Manage Posts</h1>
      <AdminPostTable posts={posts} />
    </div>
  );
}

export default ManagePosts;