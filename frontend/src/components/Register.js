// Import React and useState hook for managing form and error state
import React, { useState } from 'react';

// Import the API function to register a new user
import { registerUser } from '../services/api';

// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Register component for creating a new user account
const Register = () => {
  // Form data state for username and password
  const [formData, setFormData] = useState({ username: '', password: '' });

  // State to store error messages
  const [error, setError] = useState('');

  // Hook for redirecting after successful registration
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      // Attempt to register the user via API
      await registerUser(formData);
      // Redirect to login page on success
      navigate('/login');
    } catch (err) {
      // Display error message on failure
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// Export the Register component
export default Register;
