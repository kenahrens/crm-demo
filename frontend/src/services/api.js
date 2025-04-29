import axios from 'axios';

const API_BASE_URL = '/v1/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      // Log and handle known errors
      console.error('API Error:', response.status, response.data);
    } else {
      // Network errors or other issues
      console.error('API Error: Network error or server not available');
    }
    
    return Promise.reject(error);
  }
);

export default api; 