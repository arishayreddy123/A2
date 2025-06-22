// Import Axios to handle HTTP requests
import axios from 'axios';

// Create an Axios instance with the base API URL
const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Register a new user by sending a POST request to the register endpoint
export const registerUser = (data) => API.post('auth/register/', data);

// Log in a user and retrieve JWT tokens via the token endpoint
export const loginUser = (data) => API.post('auth/token/', data);

// Remove the JWT token from localStorage to log out the user
export const logoutUser = () => localStorage.removeItem('token');

// Retrieve the stored JWT token from localStorage
export const getToken = () => localStorage.getItem('token');
