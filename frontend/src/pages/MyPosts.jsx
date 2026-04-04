import { useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";
import MyPostList from "../components/post/MyPostList";

function MyPosts() {
  const { myPosts, getMyPosts } = useContext(PostContext);

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div>
      <h1>My Posts</h1>
      <MyPostList posts={myPosts} />
    </div>
  );
}

export default MyPosts;