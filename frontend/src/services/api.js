import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ======================
// Request Interceptor
// ======================

api.interceptors.request.use(
  (config) => {

    // Attach JWT Token Automatically
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ======================
// Response Interceptor
// ======================

api.interceptors.response.use(
  (response) => response,

  (error) => {

    // Unauthorized
    if (error.response?.status === 401) {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/login';
      }

      throw new Error(
        error.response?.data?.message ||
        'Unauthorized access'
      );
    }

    // Bad Request
    if (error.response?.status === 400) {

      throw new Error(
        error.response?.data?.message ||
        'Bad Request'
      );
    }

    // Not Found
    if (error.response?.status === 404) {

      throw new Error(
        error.response?.data?.message ||
        'Resource not found'
      );
    }

    // Server Error
    if (error.response?.status >= 500) {

      throw new Error(
        error.response?.data?.message ||
        'Server error. Please try again later.'
      );
    }

    return Promise.reject(error);
  }
);

export default api;