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
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  // Get resource availability
  getResourceAvailability: async (resourceId, startDate, endDate) => {
    const response = await api.get(`/resources/${resourceId}/availability`, {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Create reservation
  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  // Update reservation
  updateReservation: async (id, reservationData) => {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
  },

  // Cancel reservation
  cancelReservation: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
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
    const response = await api.post('/reservations/check-conflicts', {
      resourceId,
      startTime,
      endTime,
    });
    return response.data;
  },
};

export default reservationService; 