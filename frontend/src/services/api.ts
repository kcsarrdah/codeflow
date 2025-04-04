import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Problem-related endpoints
export const problemsApi = {
  getProblems: () => api.get('/problems'),
  getProblem: (id: number) => api.get(`/problems/${id}`),
  updateProblemStatus: (id: number, status: {
    isCompleted?: boolean;
    isRevised?: boolean;
    isFavorite?: boolean;
  }) => api.patch(`/problems/${id}/status`, status),
  getUserProgress: () => api.get('/problems/progress'),
};


// User-related endpoints
export const userApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.patch('/auth/profile', data),
};

export default api;