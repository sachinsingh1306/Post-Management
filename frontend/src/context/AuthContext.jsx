import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= LOAD USER =================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("userInfo");
      }
    } catch (error) {
      console.error("Invalid user in localStorage");
      localStorage.removeItem("userInfo");
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= LOGIN =================

  const login = async (formData) => {
    try {
      const res = await API.post("/auth/login", formData);

      // 🔥 backend returns full user object + token
      const userData = res.data;

      // Store everything in ONE place
      localStorage.setItem("userInfo", JSON.stringify(userData));

      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // ================= REGISTER =================

  const register = async (formData) => {
    try {
      const res = await API.post("/auth/register", formData);

      // Auto login after register (better UX)
      const userData = res.data;

      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Register failed",
      };
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};