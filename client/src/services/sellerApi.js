import { baseUrl } from '../components/common/baseUrl';

// Get authorization token from localStorage
const getToken = () => localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
};

// ============== DASHBOARD ==============

export const getDashboardStats = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/dashboard`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// ============== PRODUCTS ==============

export const getSellerProducts = async (sellerId, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/api/seller/${sellerId}/products${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (sellerId, productData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/products`, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/products/${productId}`, {
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/products/${productId}`, {
      method: 'DELETE',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// ============== ORDERS ==============

export const getSellerOrders = async (sellerId, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/api/seller/${sellerId}/orders${queryString ? '?' + queryString : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const getOrderStats = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/orders/stats`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching order stats:', error);
    throw error;
  }
};

// ============== BRANCHES ==============

export const getSellerBranches = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/branches`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

export const addBranch = async (sellerId, branchData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/branches`, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(branchData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding branch:', error);
    throw error;
  }
};

export const updateBranch = async (branchId, branchData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/branches/${branchId}`, {
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(branchData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating branch:', error);
    throw error;
  }
};

export const deleteBranch = async (branchId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/branches/${branchId}`, {
      method: 'DELETE',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting branch:', error);
    throw error;
  }
};

// ============== PAYOUTS ==============

export const getPayouts = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/payouts`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching payouts:', error);
    throw error;
  }
};

export const requestPayout = async (sellerId, amount) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/payouts/request`, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ amount }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error requesting payout:', error);
    throw error;
  }
};

export const getPayoutAnalytics = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/analytics`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

// ============== PAYMENT METHODS ==============

export const getPaymentMethods = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/payment-methods`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const addPaymentMethod = async (sellerId, methodData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/payment-methods`, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(methodData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

export const deletePaymentMethod = async (methodId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/payment-methods/${methodId}`, {
      method: 'DELETE',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting payment method:', error);
    throw error;
  }
};

// ============== TAX INFORMATION ==============

export const getTaxInfo = async (sellerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/tax-info`, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching tax info:', error);
    throw error;
  }
};

export const updateTaxInfo = async (sellerId, taxData) => {
  try {
    const response = await fetch(`${baseUrl}/api/seller/${sellerId}/tax-info`, {
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(taxData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating tax info:', error);
    throw error;
  }
};
