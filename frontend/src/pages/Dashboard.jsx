import { User, FileText, Heart, TrendingUp, Clock } from "lucide-react";

function Dashboard() {
  // Static Data
  const stats = [
    { title: "Total Posts", value: 24, icon: <FileText size={20} />, color: "bg-blue-500" },
    { title: "Likes", value: 132, icon: <Heart size={20} />, color: "bg-pink-500" },
    { title: "Followers", value: 89, icon: <User size={20} />, color: "bg-emerald-500" },
    { title: "Growth", value: "+12%", icon: <TrendingUp size={20} />, color: "bg-purple-500" },
  ];

  const recentPosts = [
    { id: 1, title: "How to learn React fast", date: "2 days ago", likes: 34 },
    { id: 2, title: "JavaScript Tips & Tricks", date: "5 days ago", likes: 21 },
    { id: 3, title: "Understanding Tailwind CSS", date: "1 week ago", likes: 18 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-xl text-white ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500">{item.title}</p>
              <h2 className="text-xl font-bold text-slate-800">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Posts</h2>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">{post.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {post.date}
                  </p>
                </div>
                <span className="text-sm font-medium text-pink-500">
                  ❤️ {post.likes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-2xl font-bold mb-4">
              S
            </div>

            <h3 className="text-lg font-semibold">Sachin Singh</h3>
            <p className="text-sm text-slate-400 mb-4">Frontend Developer</p>

            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-medium transition">
              Edit Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;