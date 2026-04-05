import { useEffect, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  ArrowUpRight 
} from "lucide-react";

function AdminDashboard() {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  const total = posts.length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const approved = posts.filter((p) => p.status === "approved").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;

  // Calculate percentages for the progress bar
  const approvedPercentage = total > 0 ? (approved / total) * 100 : 0;
  const pendingPercentage = total > 0 ? (pending / total) * 100 : 0;
  const rejectedPercentage = total > 0 ? (rejected / total) * 100 : 0;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <BarChart3 className="text-indigo-600" size={32} />
              Admin Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Real-time metrics for your community's content flow.
            </p>
          </div>
          <button 
            onClick={() => getAllPosts()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Refresh Data
          </button>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Posts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg w-fit mb-4">
                <Layers size={24} />
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Posts</p>
              <h3 className="text-4xl font-black text-slate-900 mt-1">{total}</h3>
            </div>
            <ArrowUpRight className="absolute top-4 right-4 text-slate-200 group-hover:text-indigo-200 transition-colors" size={40} />
          </div>

          {/* Pending Posts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg w-fit mb-4">
              <Clock size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">{pending}</h3>
          </div>

          {/* Approved Posts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit mb-4">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Approved</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">{approved}</h3>
          </div>

          {/* Rejected Posts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg w-fit mb-4">
              <XCircle size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Rejected</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">{rejected}</h3>
          </div>
        </div>

        {/* Visual Distribution Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-6">Approval Distribution</h4>
          
          <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden mb-8">
            <div 
              style={{ width: `${approvedPercentage}%` }} 
              className="h-full bg-emerald-500 transition-all duration-1000"
              title={`Approved: ${Math.round(approvedPercentage)}%`}
            />
            <div 
              style={{ width: `${pendingPercentage}%` }} 
              className="h-full bg-amber-400 transition-all duration-1000"
              title={`Pending: ${Math.round(pendingPercentage)}%`}
            />
            <div 
              style={{ width: `${rejectedPercentage}%` }} 
              className="h-full bg-rose-500 transition-all duration-1000"
              title={`Rejected: ${Math.round(rejectedPercentage)}%`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-600 font-medium">Approved ({Math.round(approvedPercentage)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span className="text-sm text-slate-600 font-medium">Pending ({Math.round(pendingPercentage)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-sm text-slate-600 font-medium">Rejected ({Math.round(rejectedPercentage)}%)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;