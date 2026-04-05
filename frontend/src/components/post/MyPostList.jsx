import MyPostCard from "./MyPostCard";
import { LayoutGrid, Inbox } from "lucide-react";

function MyPostList({ posts }) {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <LayoutGrid className="text-emerald-600" size={28} />
              My Submissions
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Track the status of your posts and view moderator feedback.
            </p>
          </div>
          
          <div className="hidden sm:block">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              {posts.length} Posts Total
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div 
                key={post._id} 
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <MyPostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-slate-50 rounded-full text-slate-300 mb-4">
              <Inbox size={48} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No posts yet</h3>
            <p className="text-slate-500 mt-2 text-center max-w-xs">
              When you share your first post, it will appear here for you to track.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPostList;