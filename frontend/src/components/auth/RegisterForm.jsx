import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      // You can replace this alert with a toast later for extra polish
      alert("Account created successfully!");
      navigate("/login");
    } else {
      setError(res.message || "Something went wrong. Please try again.");
    }
  };

  const inputStyles = "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700 placeholder:text-slate-400";
  const labelStyles = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Registration Header */}
        <div className="bg-slate-900 px-8 py-10 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/20">
              <UserPlus size={24} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Join the Community</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Create your account to start sharing insights
            </p>
          </div>
          {/* Decorative Blur */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Error Message Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm animate-in fade-in slide-in-from-top-1">
              <ShieldCheck size={16} className="rotate-180" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className={labelStyles}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className={labelStyles}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={labelStyles}>Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] mt-4"
          >
            Create Account
            <ArrowRight size={18} />
          </button>

          {/* Login Redirect */}
          <div className="pt-4 text-center">
            <p className="text-sm text-slate-500">
              Already a member?{" "}
              <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;