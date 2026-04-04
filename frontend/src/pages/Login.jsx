import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: "",
    pwd: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          name="_id"
          placeholder="User ID"
          className="border w-full mb-3 p-2"
          onChange={handleChange}
        />

        <input
          name="pwd"
          type="password"
          placeholder="Password"
          className="border w-full mb-3 p-2"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
