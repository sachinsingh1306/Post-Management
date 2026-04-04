import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // 🔄 Wait until auth is checked
  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
}

export default PrivateRoute;