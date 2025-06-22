// Import Axios for making HTTP requests
import axios from 'axios';

// Create an Axios instance with the base API URL
const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Attach a request interceptor to include the JWT token in headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Set the Authorization header with the Bearer token
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all available rooms
export const getRooms = () => API.get('rooms/');

// Fetch all reservations for the current user
export const getReservations = () => API.get('reservations/');

// Create a new reservation
export const createReservation = (data) => API.post('reservations/', data);

// Update an existing reservation by ID
export const updateReservation = (id, data) => API.put(`reservations/${id}/`, data);

// Delete a reservation by ID
export const deleteReservation = (id) => API.delete(`reservations/${id}/`);

// Log in a user and receive a JWT token
export const loginUser = (data) => API.post('auth/login/', data);

// Register a new user account
export const registerUser = (data) => API.post('auth/register/', data);
