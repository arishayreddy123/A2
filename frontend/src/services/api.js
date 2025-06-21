// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Change this when deploying
});

// API functions
export const getRooms = () => API.get('rooms/');
export const getReservations = () => API.get('reservations/');
export const createReservation = (data) => API.post('reservations/', data);
export const deleteReservation = (id) => API.delete(`reservations/${id}/`);
