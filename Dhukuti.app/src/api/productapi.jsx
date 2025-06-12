import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dhukuti_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("dhukuti_token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Product API functions
export const productAPI = {
  // Get all products with filters
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products?${queryString}`);
  },

  // Get single product
  getProductById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products/category/${categoryId}?${queryString}`);
  },

  // Search products
  searchProducts: async (searchTerm, filters = {}) => {
    const params = { search: searchTerm, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products/search?${queryString}`);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return await api.get("/products/featured");
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    return await api.post(`/products/${productId}/reviews`, reviewData);
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    return await api.get(`/products/${productId}/reviews`);
  },
};

// Auth API functions
export const authAPI = {
  // Register user
  register: async (userData) => {
    return await api.post("/auth/register", userData);
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.token) {
      localStorage.setItem("dhukuti_token", response.token);
    }
    return response;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("dhukuti_token");
    return Promise.resolve();
  },

  // Get current user
  getCurrentUser: async () => {
    return await api.get("/auth/me");
  },

  // Update profile
  updateProfile: async (userData) => {
    return await api.put("/auth/profile", userData);
  },
};

// Order API functions
export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    return await api.post("/orders", orderData);
  },

  // Get user orders
  getUserOrders: async () => {
    return await api.get("/orders/my-orders");
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return await api.get(`/orders/${orderId}`);
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    return await api.put(`/orders/${orderId}/status`, { status });
  },
};

// Artisan API functions
export const artisanAPI = {
  // Get all artisans
  getAllArtisans: async () => {
    return await api.get("/artisans");
  },

  // Get artisan by ID
  getArtisanById: async (id) => {
    return await api.get(`/artisans/${id}`);
  },

  // Get products by artisan
  getArtisanProducts: async (artisanId) => {
    return await api.get(`/artisans/${artisanId}/products`);
  },
};

export default api;
