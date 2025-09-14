import { useAuth } from '@/contexts/AuthContext';

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export const useAuthRequest = () => {
  const { token, refreshToken, logout } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const makeRequest = async (endpoint: string, options: RequestOptions = {}) => {
    const { requireAuth = true, ...fetchOptions } = options;

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    // Add auth token if required
    if (requireAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      // If unauthorized and we have a token, try to refresh
      if (response.status === 401 && requireAuth && token) {
        const refreshed = await refreshToken();
        if (refreshed) {
          // Retry the request with new token
          const newToken = localStorage.getItem('token');
          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await fetch(`${API_URL}${endpoint}`, {
              ...fetchOptions,
              headers,
            });
            return retryResponse;
          }
        } else {
          // Refresh failed, user needs to login again
          logout();
          throw new Error('Session expired. Please login again.');
        }
      }

      return response;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  };

  return { makeRequest };
};
