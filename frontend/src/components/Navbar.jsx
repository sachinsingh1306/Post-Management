import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-black text-white p-3 flex justify-between">

      <Link to="/">Home</Link>

      <div className="space-x-4">
        <Link to="/create">Create</Link>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
};

export default Navbar;
