import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // 🔄 Wait until auth loads
  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized admin
  return children;
}

export default AdminRoute;