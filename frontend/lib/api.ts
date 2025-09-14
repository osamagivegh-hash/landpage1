import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://landpage1-production.up.railway.app/api';

console.log('API_URL configured as:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Meals
  getMeals: async (params?: any) => {
    const response = await api.get('/meals', { params });
    return response.data;
  },
  
  getMealById: async (id: string) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },
  
  getSpecialMeals: async () => {
    const response = await api.get('/meals/special/offers');
    return response.data;
  },
  
  getMealsByCategory: async (category: string) => {
    const response = await api.get(`/meals/category/${category}`);
    return response.data;
  },
  
  // Offers
  getOffers: async () => {
    const response = await api.get('/offers');
    return response.data;
  },
  
  getOfferById: async (id: string) => {
    const response = await api.get(`/offers/${id}`);
    return response.data;
  },
  
  getOfferByPromoCode: async (code: string) => {
    const response = await api.get(`/offers/promo/${code}`);
    return response.data;
  },
  
  // Restaurant
  getRestaurantInfo: async () => {
    const response = await api.get('/restaurant');
    return response.data;
  },
  
  getRestaurantHours: async () => {
    const response = await api.get('/restaurant/hours');
    return response.data;
  },
  
  getRestaurantContact: async () => {
    const response = await api.get('/restaurant/contact');
    return response.data;
  },
};

export default api;