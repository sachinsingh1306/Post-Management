import { useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostList from "../components/post/PostList";

function Home() {
  const { posts, getApprovedPosts } = useContext(PostContext);

  useEffect(() => {
    getApprovedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <h1 className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-3xl font-bold px-8 py-3 rounded-2xl shadow-lg shadow-emerald-200/50 tracking-tight transition-transform hover:scale-105 cursor-default">
            All Posts
          </h1>
          <p className="mt-4 text-gray-500 font-medium">
            Discover the latest approved insights from our community.
          </p>
        </header>

        {/* Content Area */}
        <main className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
          <PostList posts={posts} />
        </main>
      </div>
    </div>
  );
}

export default Home;