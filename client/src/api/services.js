import apiClient from './client';
import { API_ENDPOINTS } from '../config/constants';

// Authentication Services
export const authService = {
  register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
};

// Category Services
export const categoryService = {
  getAll: () => apiClient.get(API_ENDPOINTS.CATEGORIES),
  getById: (id) => apiClient.get(`${API_ENDPOINTS.CATEGORIES}/${id}`),
};

// Product Services
export const productService = {
  getAll: (params) => apiClient.get(API_ENDPOINTS.PRODUCTS, { params }),
  getById: (id) => apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  search: (query) => apiClient.get(`${API_ENDPOINTS.PRODUCTS}/search`, { params: { q: query } }),
  getRecommendations: (userId) => apiClient.post('/recommendations', { userId }),
};

// Cart Services
export const cartService = {
  getCart: () => apiClient.get(API_ENDPOINTS.CART),
  addToCart: (productId, quantity) =>
    apiClient.post(API_ENDPOINTS.CART, { productId, quantity }),
  removeFromCart: (productId) =>
    apiClient.delete(`${API_ENDPOINTS.CART}/${productId}`),
  updateCart: (items) => apiClient.put(API_ENDPOINTS.CART, { items }),
  clearCart: () => apiClient.delete(API_ENDPOINTS.CART),
};

// Order Services
export const orderService = {
  getOrders: () => apiClient.get(API_ENDPOINTS.ORDERS),
  getOrderById: (id) => apiClient.get(`${API_ENDPOINTS.ORDERS}/${id}`),
  createOrder: (orderData) => apiClient.post(API_ENDPOINTS.ORDERS, orderData),
  updateOrder: (id, data) => apiClient.put(`${API_ENDPOINTS.ORDERS}/${id}`, data),
};

// Support Services
export const supportService = {
  submitQuery: (queryData) => apiClient.post(API_ENDPOINTS.SUPPORT, queryData),
  getSupport: () => apiClient.get(API_ENDPOINTS.SUPPORT),
};

// User Services
export const userService = {
  getProfile: () => apiClient.get(API_ENDPOINTS.USER),
  updateProfile: (userData) => apiClient.put(API_ENDPOINTS.USER, userData),
  getUserOrders: () => apiClient.get(`${API_ENDPOINTS.USER}/orders`),
};
