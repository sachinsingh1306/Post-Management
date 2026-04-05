import PostCard from "./PostCard";
import { Sparkles, Activity } from "lucide-react";

function PostList({ posts }) {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        
        {/* Feed Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Community Feed
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Latest Updates
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <Activity size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600">{posts.length} Posts</span>
          </div>
        </div>

        {/* Posts Container */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <div 
                key={post._id} 
                className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Sparkles size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Quiet for now...</h2>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
              There aren't any approved posts in the feed yet. Why not be the first to share something?
            </p>
          </div>
        )}

        {/* End of Feed Indicator */}
        {posts.length > 0 && (
          <div className="mt-12 py-8 text-center">
            <div className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300 mx-1"></div>
            <div className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300 mx-1"></div>
            <div className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300 mx-1"></div>
            <p className="text-slate-400 text-xs font-medium mt-4 tracking-widest uppercase">
              You've reached the end
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostList;