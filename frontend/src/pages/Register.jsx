import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    pwd: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          name="_id"
          placeholder="User ID"
          className="border w-full mb-3 p-2"
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Name"
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

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
