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
    try {
      const response = await api.get('/resources');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  // Get resource by ID
  getResourceById: async (id) => {
    try {
      const response = await api.get(`/resources/${id}`);
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
      
      const response = await api.get(`/resources/${resourceId}/availability`, {
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