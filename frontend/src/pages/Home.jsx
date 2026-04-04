import { useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostList from "../components/post/PostList";

function Home() {
  const { posts, getApprovedPosts } = useContext(PostContext);

  useEffect(() => {
    getApprovedPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default Home;