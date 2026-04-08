import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Tag, User } from "lucide-react";

function PostCard({ post }) {
  const { likePost, dislikePost } = useContext(PostContext);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Card Body */}
      <div className="p-6">
        {/* Author & Category Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <User size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {post.user?.name || "Community Member"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
            <Tag size={12} />
            {post.category || "General"}
          </div>
        </div>

        {/* Content Section */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {post.content}
        </p>

        {/* Interaction Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <button
              onClick={() => likePost(post._id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95"
            >
              <ThumbsUp size={18} />
              <span className="text-sm font-bold">{post.likes.length}</span>
            </button>

            {/* Dislike Button */}
            <button
              onClick={() => dislikePost(post._id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95"
            >
              <ThumbsDown size={18} />
              <span className="text-sm font-bold">{post.dislikes.length}</span>
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default PostCard;