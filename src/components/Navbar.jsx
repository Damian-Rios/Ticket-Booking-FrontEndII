import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

// Navbar component displays the top navigation bar with links and user authentication controls
const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Handles user logout and redirects to the login page
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Brand logo/link */}
        <Link to="/" className="text-2xl font-bold">
          Eventify
        </Link>

        {/* Navigation icons and authentication buttons */}
        <div className="flex items-center space-x-6">
          {/* Home icon */}
          <Link
            to="/"
            className="hover:text-blue-200 relative group"
            aria-label="Home"
          >
            <HomeIcon className="h-6 w-6" />
          </Link>

          {/* Cart icon */}
          <Link
            to="/cart"
            className="hover:text-blue-200 relative group"
            aria-label="Cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>

          {/* Profile icon */}
          <Link
            to="/profile"
            className="hover:text-blue-200 relative group"
            aria-label="Profile"
          >
            <UserCircleIcon className="h-6 w-6" />
          </Link>

          {/* Show Logout if user is logged in, otherwise show Login link */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
