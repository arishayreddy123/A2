import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRooms = () => API.get('rooms/');
export const getReservations = () => API.get('reservations/');
export const createReservation = (data) => API.post('reservations/', data);
export const updateReservation = (id, data) => API.put(`reservations/${id}/`, data);
export const deleteReservation = (id) => API.delete(`reservations/${id}/`);
export const loginUser = (data) => API.post('auth/login/', data);
export const registerUser = (data) => API.post('auth/register/', data);
