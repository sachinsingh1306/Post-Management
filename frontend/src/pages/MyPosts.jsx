import { useEffect, useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import MyPostList from "../components/post/MyPostList";
import { Link } from "react-router-dom";
import { FileText, Plus, ChevronRight, Home, RefreshCw } from "lucide-react";

function MyPosts() {
  const { myPosts, getMyPosts } = useContext(PostContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getMyPosts();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getMyPosts();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              <Home size={14} />
            </Link>
            <ChevronRight size={12} />
            <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">
              Dashboard
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">My Posts</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm">
                <FileText size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  My Submissions
                </h1>
                <p className="text-sm text-slate-500">
                  Manage your content and track approval status.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100"
                title="Refresh posts"
              >
                <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
              </button>

              <Link 
                to="/create-post" 
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
              >
                <Plus size={18} />
                Create New Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Post Stats Summary */}
        <div className="flex items-center gap-6 mb-8 px-2 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold text-slate-900">{myPosts.length}</span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Posts</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold text-emerald-600">
              {myPosts.filter(p => p.status === 'approved').length}
            </span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Published</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold text-amber-500">
              {myPosts.filter(p => p.status === 'pending').length}
            </span>
            <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Under Review</span>
          </div>
        </div>

        {/* The List Container */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MyPostList posts={myPosts} />
        </div>
      </main>
    </div>
  );
}

export default MyPosts;