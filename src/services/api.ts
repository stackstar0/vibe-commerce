import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },
  add: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart', { productId, quantity });
    return response.data;
  },
  update: async (productId, quantity) => {
    const response = await apiClient.put(`/cart/${productId}`, { quantity });
    return response.data;
  },
  remove: async (productId) => {
    const response = await apiClient.delete(`/cart/${productId}`);
    return response.data;
  },
  clear: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },
};

// Checkout API
export const checkoutAPI = {
  process: async (cartItems, customerInfo) => {
    const response = await apiClient.post('/checkout', { cartItems, customerInfo });
    return response.data;
  },
  getOrders: async () => {
    const response = await apiClient.get('/checkout/orders');
    return response.data;
  },
  getOrderById: async (orderId) => {
    const response = await apiClient.get(`/checkout/orders/${orderId}`);
    return response.data;
  },
};

export default apiClient;
