import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * API Client
 * 
 * Axios instance configured for SmartPrescription backend.
 * Automatically adds JWT token to requests.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
apiClient.interceptors.request.use(
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

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API Services

/**
 * Authentication API
 */
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },
  
  register: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/register', { username, password, status: 0 });
    return response.data;
  },
  
  logout: async (username: string) => {
    const response = await apiClient.post(`/auth/logout/${username}`);
    return response.data;
  },
};

/**
 * Patient API
 */
export const patientApi = {
  getAll: async () => {
    const response = await apiClient.get('/patients');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },
  
  create: async (patient: any) => {
    const response = await apiClient.post('/patients', patient);
    return response.data;
  },
  
  update: async (id: number, patient: any) => {
    const response = await apiClient.put(`/patients/${id}`, patient);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  },
  
  searchByName: async (name: string) => {
    const response = await apiClient.get(`/patients/search?name=${name}`);
    return response.data;
  },
  
  searchByPhone: async (phone: string) => {
    const response = await apiClient.get(`/patients/search?phone=${phone}`);
    return response.data;
  },
};

/**
 * Medicine API
 */
export const medicineApi = {
  getAll: async () => {
    const response = await apiClient.get('/medicines');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await apiClient.get(`/medicines/${id}`);
    return response.data;
  },
  
  create: async (medicine: any) => {
    const response = await apiClient.post('/medicines', medicine);
    return response.data;
  },
  
  update: async (id: number, medicine: any) => {
    const response = await apiClient.put(`/medicines/${id}`, medicine);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await apiClient.delete(`/medicines/${id}`);
    return response.data;
  },
  
  search: async (query: string) => {
    const response = await apiClient.get(`/medicines/search?q=${query}`);
    return response.data;
  },
  
  getTop: async () => {
    const response = await apiClient.get('/medicines/top');
    return response.data;
  },
};

/**
 * Prescription API
 */
export const prescriptionApi = {
  getAll: async () => {
    const response = await apiClient.get('/prescriptions');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await apiClient.get(`/prescriptions/${id}`);
    return response.data;
  },
  
  create: async (prescription: any) => {
    const response = await apiClient.post('/prescriptions', prescription);
    return response.data;
  },
  
  update: async (id: number, prescription: any) => {
    const response = await apiClient.put(`/prescriptions/${id}`, prescription);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await apiClient.delete(`/prescriptions/${id}`);
    return response.data;
  },
  
  getPatientHistory: async (patientId: number) => {
    const response = await apiClient.get(`/prescriptions/patient/${patientId}`);
    return response.data;
  },
};
