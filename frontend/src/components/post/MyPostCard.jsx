import { FileText, Tag, AlertCircle, Calendar, ChevronRight } from "lucide-react";

function MyPostCard({ post }) {
  // Define status colors to match your admin table
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 ring-slate-500/20";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Decoration Bar */}
      <div className={`h-1.5 w-full ${
        post.status === "approved" ? "bg-emerald-500" : 
        post.status === "rejected" ? "bg-rose-500" : "bg-amber-500"
      }`} />

      <div className="p-6 flex flex-col flex-grow">
        {/* Header: Title & Status */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
            {post.title}
          </h3>
          <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ring-2 ${getStatusStyles(post.status)}`}>
            {post.status}
          </span>
        </div>

        {/* Content Preview */}
        <div className="relative mb-6">
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 italic">
            "{post.content}"
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="mt-auto space-y-3 pt-4 border-t border-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Tag size={14} className="text-slate-400" />
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {post.category || "General"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Rejection Feedback Area */}
        {post.status === "rejected" && post.adminMessage && (
          <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-100 flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-rose-800 uppercase tracking-tighter">Feedback</p>
              <p className="text-sm text-rose-700 leading-snug">{post.adminMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Hover Action Link */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end text-xs font-bold text-slate-500 group-hover:text-emerald-600 transition-colors">
        View Details <ChevronRight size={14} />
      </div>
    </div>
  );
}

export default MyPostCard;