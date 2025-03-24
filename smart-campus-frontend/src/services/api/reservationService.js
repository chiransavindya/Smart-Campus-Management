import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log API responses for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response [${response.config.method}] ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error(`API Error [${error.config?.method}] ${error.config?.url}:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const reservationService = {
  // Get all resources
  getAllResources: async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      console.log('Fetching resources from API...');
      const response = await api.get('/reservations/resources', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (Array.isArray(response.data)) {
        console.log(`API returned ${response.data.length} resources`);
        return response.data;
      } else {
        console.error('API returned non-array data for resources:', response.data);
        throw new Error('Invalid response format: Resources data is not an array');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error fetching resources:', error);
      
      // Provide more specific error messages based on the error type
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: Could not fetch resources within the time limit.');
      } else if (error.code === 'ECONNABORTED' || !error.response) {
        throw new Error('Could not connect to the server. Please check your internet connection.');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        throw new Error('You do not have permission to access resources.');
      } else if (error.response?.status === 404) {
        throw new Error('Resource endpoint not found. The API may have changed.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later or contact support.');
      }
      
      // If we have a specific error message from the server, use it
      if (error.response?.data?.message) {
        throw new Error(`Server error: ${error.response.data.message}`);
      }
      
      // Default error
      throw error;
    }
  },

  // Get resource by ID
  getResourceById: async (id) => {
    try {
      const response = await api.get(`/reservations/resources/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource with ID ${id}:`, error);
      throw error;
    }
  },

  // Get resource availability
  getResourceAvailability: async (resourceId, startDate, endDate) => {
    try {
      const formattedStartDate = startDate ? new Date(startDate).toISOString() : null;
      const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;
      
      const response = await api.get(`/reservations/resources/${resourceId}/availability`, {
        params: { 
          startDate: formattedStartDate, 
          endDate: formattedEndDate 
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error checking resource availability for ID ${resourceId}:`, error);
      throw error;
    }
  },

  // Create reservation
  createReservation: async (reservationData) => {
    try {
      console.log('Creating reservation with data:', reservationData);
      
      // Ensure all required fields are present
      if (!reservationData.resourceId) {
        throw new Error('Resource ID is required');
      }
      
      if (!reservationData.startTime) {
        throw new Error('Start time is required');
      }
      
      if (!reservationData.endTime) {
        throw new Error('End time is required');
      }
      
      if (!reservationData.purpose) {
        throw new Error('Purpose is required');
      }
      
      // Ensure dates are in ISO format
      const formattedData = {
        ...reservationData,
        startTime: reservationData.startTime ? new Date(reservationData.startTime).toISOString() : null,
        endTime: reservationData.endTime ? new Date(reservationData.endTime).toISOString() : null,
      };
      
      const response = await api.post('/reservations', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Update reservation
  updateReservation: async (id, reservationData) => {
    try {
      console.log(`Updating reservation ${id} with data:`, reservationData);
      
      // Ensure dates are in ISO format
      const formattedData = {
        ...reservationData,
        startTime: reservationData.startTime ? new Date(reservationData.startTime).toISOString() : null,
        endTime: reservationData.endTime ? new Date(reservationData.endTime).toISOString() : null,
      };
      
      const response = await api.put(`/reservations/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating reservation with ID ${id}:`, error);
      throw error;
    }
  },

  // Cancel reservation
  cancelReservation: async (id) => {
    try {
      const response = await api.delete(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling reservation with ID ${id}:`, error);
      throw error;
    }
  },

  // Get user's reservations
  getUserReservations: async () => {
    try {
      const response = await api.get('/reservations');
      // Make sure we always return an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      return [];
    }
  },

  // Get resource reservations
  getResourceReservations: async (resourceId) => {
    try {
      const response = await api.get(`/reservations/resource/${resourceId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching resource reservations:', error);
      return [];
    }
  },

  // Check for reservation conflicts
  checkReservationConflicts: async (resourceId, startTime, endTime) => {
    try {
      const formattedStartTime = startTime ? new Date(startTime).toISOString() : null;
      const formattedEndTime = endTime ? new Date(endTime).toISOString() : null;
      
      const response = await api.post('/reservations/check-conflicts', {
        resourceId,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
      return response.data;
    } catch (error) {
      console.error('Error checking for reservation conflicts:', error);
      throw error;
    }
  },
};

export default reservationService; 