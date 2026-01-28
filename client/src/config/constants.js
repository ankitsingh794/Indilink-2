// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SUPPORT: '/support',
  PROFILE: '/profile',
  CHECKOUT: '/checkout',
  REGISTER: '/register',
  SELLER_DASHBOARD: '/seller-dashboard',
  ADMIN_DASHBOARD: '/admin-dashboard',
  PRODUCTS: '/products',
  CART: '/cart',
};

// Colors - Modern Tech Palette
export const COLORS = {
  // Primary Gradients (Modern)
  PRIMARY_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  SECONDARY_GRADIENT: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  ACCENT_GRADIENT: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  
  // Primary Colors
  PRIMARY: '#667eea',
  PRIMARY_LIGHT: '#8b9fff',
  PRIMARY_DARK: '#5568d3',
  
  // Secondary Colors
  SECONDARY: '#764ba2',
  SECONDARY_LIGHT: '#9b5fa3',
  
  // Accent Colors
  ACCENT: '#f093fb',
  ACCENT_LIGHT: '#f5a8fd',
  
  // Success/Info Colors
  SUCCESS: '#10b981',
  SUCCESS_LIGHT: '#6ee7b7',
  INFO: '#4facfe',
  
  // Warning/Error Colors
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  ERROR_LIGHT: '#fecaca',
  
  // Neutral Colors
  TEXT_PRIMARY: '#1f2937',
  TEXT_SECONDARY: '#6b7280',
  TEXT_LIGHT: '#9ca3af',
  
  // Background Colors
  BG_PRIMARY: '#ffffff',
  BG_SECONDARY: '#f9fafb',
  BG_TERTIARY: '#f3f4f6',
  BG_OVERLAY: 'rgba(0, 0, 0, 0.5)',
  
  // Legacy aliases for backward compatibility
  PRIMARY_GREEN: '#10b981',
  LIGHT_GREEN: '#6ee7b7',
  BLUE: '#4facfe',
  YELLOW: '#f59e0b',
  RED: '#ef4444',
  BG_LIGHT: '#f9fafb',
  WHITE: '#ffffff',
  
  // Shadows
  SHADOW: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  SHADOW_MD: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  SHADOW_LG: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  SHADOW_XL: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
  },
  CATEGORIES: '/categories',
  RECOMMENDATIONS: '/recommendations',
  PRODUCTS: '/products',
  CART: '/cart',
  ORDERS: '/orders',
  SUPPORT: '/support',
  USER: '/user',
};

// User Types
export const USER_TYPES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  CART_ITEMS: 'cartItems',
};
