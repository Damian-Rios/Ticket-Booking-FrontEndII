import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';  // Custom hook for authentication context
import { useNavigate } from 'react-router-dom';  // Hook for navigation

const Login = () => {
  // Extracting login method from authentication context
  const { login } = useAuth();
  const navigate = useNavigate();  // Hook to navigate to different pages

  // State to store email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handles form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevents default form submission behavior
    setError('');  // Clears any previous error message
    try {
      await login(email, password);  // Calls login function from context
      navigate('/profile');  // Redirects to profile page upon successful login
    } catch (err) {
      console.error(err);  // Logs error if login fails
      setError('Invalid email or password');  // Sets error message for invalid login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Card container for the login form */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>

        {/* Error message display if there was a login failure */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Updates email state on input change
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Updates password state on input change
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Submit button for login */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>

        {/* Link to signup page if the user doesn't have an account */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}  // Navigate to signup page
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
