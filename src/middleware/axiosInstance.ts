// axiosInstance.ts
import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'https://swapi.py4e.com/api', // Base URL for your API
});
// Request Interceptor (e.g., adding token or headers)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any custom headers or logic here
    // Example: Add Authorization token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle any request errors globally
    return Promise.reject(error);
  }
);

// Response Interceptor (e.g., handling errors globally)
axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle global response here if needed
    return response;
  },
  (error) => {
    // Handle errors globally, e.g., redirecting on unauthorized errors
    if (error.status === 401 || error.status === 404 || error.status === 405) {
      // Redirect or perform other actions
      return toast.error("Something went wrong !!!")
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
