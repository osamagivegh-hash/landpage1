import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

