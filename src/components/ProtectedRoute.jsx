import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// ProtectedRoute restricts access to routes based on authentication status
// If a user is logged in, it renders the child component(s)
// Otherwise, it redirects to the login page
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
