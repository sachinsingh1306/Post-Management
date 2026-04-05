import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogOut, PlusCircle, LayoutDashboard, FileText, Settings, User } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Helper to check active route for styling
  const isActive = (path) => location.pathname === path;

  // Reusable Tailwind classes
  const navLink = (path) => `
    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive(path) 
      ? "text-emerald-700 bg-emerald-50" 
      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"}
  `;

  const adminLink = (path) => `
    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
    ${isActive(path)
      ? "text-purple-700 bg-purple-50 border border-purple-100"
      : "text-purple-600 hover:bg-purple-50 hover:text-purple-800 border border-transparent"}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center group">
              <div className="h-8 w-8 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold mr-2 shadow-sm group-hover:scale-105 transition-transform">
                M
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                My App
              </h2>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={navLink("/")}>Home</Link>
            </div>
          </div>

          {/* Right: Auth & Navigation */}
          <div className="flex items-center">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600 px-3 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Standard Links */}
                <div className="hidden lg:flex items-center space-x-1">
                  <Link to="/dashboard" className={navLink("/dashboard")}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to="/my-posts" className={navLink("/my-posts")}>
                    <FileText size={16} /> My Posts
                  </Link>
                  <Link to="/create-post" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors ml-2">
                    <PlusCircle size={16} /> Create
                  </Link>
                </div>

                {/* Admin Divider & Links */}
                {user.role === "admin" && (
                  <div className="flex items-center space-x-2 border-l border-slate-200 ml-4 pl-4">
                    <Link to="/admin" className={adminLink("/admin")}>
                      <Settings size={16} /> Admin
                    </Link>
                    <Link to="/admin/posts" className={adminLink("/admin/posts")}>
                      Manage
                    </Link>
                  </div>
                )}

                {/* User Info & Logout */}
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                  <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-xs font-bold text-slate-900">{user.name || "User"}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{user.role}</span>
                  </div>
                  
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                    <User size={18} />
                  </div>

                  <button 
                    onClick={logout}
                    title="Logout"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all ml-1"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;