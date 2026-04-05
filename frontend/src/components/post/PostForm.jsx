import { useState, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { Send, Type, AlignLeft, Layers, AlertCircle } from "lucide-react";

function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "news",
  });

  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPost(formData);

    if (res.success) {
      // You could replace this with a toast notification later
      alert("Post submitted! It is now pending admin approval.");
      navigate("/my-posts");
    } else {
      alert(res.message);
    }
  };

  const inputStyles = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700 placeholder:text-slate-400";
  const labelStyles = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">Create a New Post</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Share your thoughts with the community. Posts are reviewed before going live.
            </p>
          </div>
          {/* Decorative background element */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title Field */}
          <div>
            <label className={labelStyles}>Post Title</label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                name="title"
                required
                placeholder="Give your post a catchy title..."
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          {/* Category Field */}
          <div>
            <label className={labelStyles}>Category</label>
            <div className="relative">
              <Layers className="absolute left-3 top-3 text-slate-400" size={18} />
              <select 
                name="category" 
                onChange={handleChange} 
                className={`${inputStyles} appearance-none cursor-pointer`}
              >
                <option value="news">News</option>
                <option value="entertainment">Entertainment</option>
                <option value="study">Study</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label className={labelStyles}>Content</label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 text-slate-400" size={18} />
              <textarea
                name="content"
                required
                rows="5"
                placeholder="What's on your mind?"
                onChange={handleChange}
                className={`${inputStyles} resize-none`}
              />
            </div>
          </div>

          {/* Submission Info */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Notice:</strong> Your post will be sent to our moderation team. You can track its status in the "My Posts" section.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
          >
            <Send size={18} />
            Publish Submission
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;