import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagePosts from "./pages/admin/ManagePosts";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// 🔥 CONTEXT
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

// ================= NAVBAR CONTROL =================

const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
};

// ================= APP =================

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* USER */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />

              <Route
                path="/my-posts"
                element={
                  <PrivateRoute>
                    <MyPosts />
                  </PrivateRoute>
                }
              />

              {/* ADMIN */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/posts"
                element={
                  <AdminRoute>
                    <ManagePosts />
                  </AdminRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;