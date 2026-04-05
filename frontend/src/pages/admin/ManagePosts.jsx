import { useEffect, useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import AdminPostTable from "../../components/admin/AdminPostTable";
import { ShieldCheck, RefreshCw, ChevronRight, Home } from "lucide-react";

function ManagePosts() {
  const { posts, getAllPosts } = useContext(PostContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAllPosts();
    // Small delay for visual feedback of the spin animation
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Top Utility Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <Home size={14} />
            <ChevronRight size={12} />
            <span>Admin Panel</span>
            <ChevronRight size={12} />
            <span className="text-indigo-600">Post Moderation</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Manage Posts
                </h1>
                <p className="text-sm text-slate-500">
                  Audit, approve, or remove community content to maintain safety.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  System Status
                </p>
                <p className="text-xs font-medium text-emerald-600 flex items-center justify-end gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Data
                </p>
              </div>
              
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw size={16} className={`${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Syncing...' : 'Refresh Feed'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AdminPostTable posts={posts} />
        </div>
        
        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-400 font-medium">
          Confidential Admin Access • {new Date().getFullYear()} Management Console
        </p>
      </main>
    </div>
  );
}

export default ManagePosts;