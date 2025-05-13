import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth(); // Access the signup function from the AuthContext
  const navigate = useNavigate(); // Hook to navigate to different routes

  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error state for displaying signup errors

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setError(''); // Reset any previous errors
    try {
      await signup(email, password); // Call signup function from AuthContext
      navigate('/profile'); // Navigate to profile page after successful signup
    } catch (err) {
      console.error(err); // Log error to console
      setError(err.message); // Set error message for display
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>} {/* Display error message if any */}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')} // Navigate to login page if user already has an account
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
