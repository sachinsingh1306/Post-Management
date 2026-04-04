import { useEffect, useState } from "react";
import { getAcceptedPosts, likePost, dislikePost } from "../api/postApi";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await getAcceptedPosts();
    setPosts(res.data);
  };

  return (
    <div className="p-6 space-y-4">

      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded">

          <h2 className="font-bold">{post.title}</h2>
          <p>{post.description}</p>

          <div className="flex gap-4 mt-2">

            <button
              onClick={() => likePost(post._id)}
              className="text-green-600">
              👍 Like
            </button>

            <button
              onClick={() => dislikePost(post._id)}
              className="text-red-600">
              👎 Dislike
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default Home;
