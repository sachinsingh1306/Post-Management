import { useEffect, useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostList from "../components/post/PostList";
import { Sparkles, TrendingUp, Filter, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const { posts, getApprovedPosts } = useContext(PostContext);

  useEffect(() => {
    getApprovedPosts();
  }, [getApprovedPosts]); // ✅ added dependency

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100">
              <Sparkles size={14} />
              Community Curated
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Explore the <span className="text-emerald-600 italic">Feed</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Dive into the latest insights, stories, and updates shared by our verified members. 
              Only the highest quality content makes it here.
            </p>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Feed Content */}
          <main className="flex-grow">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <TrendingUp size={20} className="text-emerald-500" />
                Latest Approved Posts
              </h2>
            </div>

            <div className="bg-white/50 rounded-3xl p-2 md:p-4 backdrop-blur-sm">
              <PostList posts={posts} />
            </div>
          </main>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3">About the Feed</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Every post you see has been reviewed by our moderation team.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl">
                <h3 className="font-bold mb-2">Want to contribute?</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Join our growing community and share your ideas.
                </p>

                {/* ✅ FIXED: Use Link as button */}
                <Link
                  to="/create-post"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
                >
                  <PlusCircle size={16} />
                  Write a Post
                </Link>

              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;