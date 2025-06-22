// Import React and useState hook for managing state
import React, { useState } from 'react';

// Import login API function
import { loginUser } from '../services/api';

// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Login component
const Login = () => {
  // State for user credentials
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // State for error message
  const [error, setError] = useState('');

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Update state when input fields change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Attempt to log in with the entered credentials
      const response = await loginUser(credentials);
      // Store the received access token in local storage
      localStorage.setItem('token', response.data.access);
      // Redirect to home page on success
      navigate('/');
    } catch (err) {
      // Display error message on failure
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Display error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
