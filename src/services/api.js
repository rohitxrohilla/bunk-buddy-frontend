import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ ADD REQUEST INTERCEPTOR TO INCLUDE JWT TOKEN
api.interceptors.request.use(
  (config) => {
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

// ✅ ADD RESPONSE INTERCEPTOR TO HANDLE TOKEN EXPIRY
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verifyEmail: (token) => api.get('/auth/verify-email', { params: { token } }),  // ✅ ADDED
  resendVerification: (userId) => api.post('/auth/resend-verification', null, { params: { userId } }),  // ✅ ADDED
};

// User APIs
export const userAPI = {
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
};

// Quiz APIs
export const quizAPI = {
  submit: (data) => api.post('/quiz', data),
  getByUserId: (userId) => api.get(`/quiz/user/${userId}`),
  update: (quizId, data) => api.put(`/quiz/${quizId}`, data),
};

// Apartment APIs
export const apartmentAPI = {
  create: (data) => api.post('/apartments', data),
  search: (params) => api.get('/apartments', { params }),
  getById: (id) => api.get(`/apartments/${id}`),
  getUserListings: (userId) => api.get(`/apartments/user/${userId}`),
  update: (id, data) => api.put(`/apartments/${id}`, data),
  delete: (id) => api.delete(`/apartments/${id}`),
};

// Roommate APIs
export const roommateAPI = {
  create: (data) => api.post('/roommates', data),
  search: (params) => api.get('/roommates', { params }),
  getById: (id) => api.get(`/roommates/${id}`),
  getUserListings: (userId) => api.get(`/roommates/user/${userId}`),
  update: (id, data) => api.put(`/roommates/${id}`, data),
  delete: (id) => api.delete(`/roommates/${id}`),
};

// Compatibility API
export const compatibilityAPI = {
  calculate: (user1, user2) => api.get('/compatibility', { params: { user1, user2 } }),
};

// Interest APIs
export const interestAPI = {
  express: (data) => api.post('/interest', data),
  getReceived: (userId) => api.get('/interest/received', { params: { userId } }),
  getSent: (userId) => api.get('/interest/sent', { params: { userId } }),
};

// Favorite APIs
export const favoriteAPI = {
  add: (data) => api.post('/favorites', data),
  getByUserId: (userId) => api.get(`/favorites/user/${userId}`),
  remove: (id) => api.delete(`/favorites/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  get: (userId) => api.get(`/dashboard/user/${userId}`),
};

export default api;