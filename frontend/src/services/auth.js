import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const registerUser = (data) => API.post('auth/register/', data);
export const loginUser = (data) => API.post('auth/token/', data);
export const logoutUser = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');
