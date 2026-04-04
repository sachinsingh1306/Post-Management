import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <h2>My App</h2>

      <Link to="/">Home</Link>

      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-post">Create Post</Link>
          <Link to="/my-posts">My Posts</Link>

          {user.role === "admin" && (
            <>
              <Link to="/admin">Admin</Link>
              <Link to="/admin/posts">Manage Posts</Link>
            </>
          )}

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;