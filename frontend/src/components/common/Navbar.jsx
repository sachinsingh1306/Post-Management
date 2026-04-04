import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // Reusable Tailwind classes for links to keep it clean
  const navLink = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200";
  const adminLink = "px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:text-purple-900 hover:bg-purple-50 border border-purple-100 transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              My App
            </h2>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link to="/" className={navLink}>Home</Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link to="/login" className={navLink}>Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-100">
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className={navLink}>Dashboard</Link>
                <Link to="/create-post" className={navLink}>Create Post</Link>
                <Link to="/my-posts" className={navLink}>My Posts</Link>

                {user.role === "admin" && (
                  <div className="flex items-center space-x-2 border-l border-gray-200 ml-2 pl-4">
                    <Link to="/admin" className={adminLink}>Admin</Link>
                    <Link to="/admin/posts" className={adminLink}>Manage Posts</Link>
                  </div>
                )}

                <button 
                  onClick={logout}
                  className="ml-4 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;