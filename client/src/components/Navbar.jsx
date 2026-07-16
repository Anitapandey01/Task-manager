import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          Task Manager
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-200 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;