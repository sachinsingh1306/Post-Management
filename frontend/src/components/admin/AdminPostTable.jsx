import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { Check, X, Trash2, User, FileText, MoreHorizontal } from "lucide-react";

function AdminPostTable({ posts }) {
  const { approvePost, rejectPost, deletePost } = useContext(PostContext);

  const handleReject = (id) => {
    const message = prompt("Enter rejection reason:");
    if (message) {
      rejectPost(id, message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Post Management
            </h2>
            <p className="text-slate-500 mt-1">
              Manage your community by reviewing and moderating content.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 w-fit">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {posts.length} Total Submissions
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Author
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Content Preview
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 text-right">
                    Management
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    {/* Author Cell */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <User size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">
                            {post.user?.name || "Anonymous"}
                          </div>
                          <div className="text-xs font-mono text-slate-400">
                            #{post._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Content Cell */}
                    <td className="px-6 py-5 max-w-xs">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-800 truncate">
                          {post.title}
                        </span>
                        <span className="text-sm text-slate-500 line-clamp-1 italic">
                          "{post.content}"
                        </span>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ${getStatusStyle(
                          post.status
                        )}`}
                      >
                        {post.status?.toUpperCase()}
                      </span>
                    </td>

                    {/* Actions Cell */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => approvePost(post._id)}
                          title="Approve"
                          className="p-2 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border border-slate-200 rounded-lg shadow-sm transition-all"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => handleReject(post._id)}
                          title="Reject"
                          className="p-2 bg-white text-amber-500 hover:bg-amber-500 hover:text-white border border-slate-200 rounded-lg shadow-sm transition-all"
                        >
                          <X size={18} />
                        </button>

                        <button
                          onClick={() => deletePost(post._id)}
                          title="Delete"
                          className="p-2 bg-white text-rose-500 hover:bg-rose-500 hover:text-white border border-slate-200 rounded-lg shadow-sm transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      {/* Mobile/Default hint */}
                      <div className="group-hover:hidden text-slate-400">
                         <MoreHorizontal size={20} className="ml-auto" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900">All clear!</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                There are no pending posts to review at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPostTable;