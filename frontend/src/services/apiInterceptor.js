import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: '/v1/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // If token exists, add to headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Logout user and redirect to login page
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Pass error along to be handled by components
    return Promise.reject(error);
  }
);

export default api; 