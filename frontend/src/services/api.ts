import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Go backend URL
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

// Debugger-related endpoints
export const debuggerApi = {
  saveDebuggerState: (state: {
    code: string;
    breakpoints: number[];
    currentLine: number;
    variables: any[];
  }) => api.post('/debugger/state', state),
  getDebuggerState: () => api.get('/debugger/state'),
  executeCode: (code: string) => api.post('/debugger/execute', { code }),
  stepThrough: (sessionId: string) => api.post(`/debugger/step/${sessionId}`),
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