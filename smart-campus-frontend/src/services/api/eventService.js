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

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/events');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Get event by ID
  getEventById: async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    try {
      // Ensure dates are in ISO format
      const formattedData = {
        ...eventData,
        startDate: eventData.startDate ? new Date(eventData.startDate).toISOString() : null,
        endDate: eventData.endDate ? new Date(eventData.endDate).toISOString() : null,
      };
      
      const response = await api.post('/events', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      // Ensure dates are in ISO format
      const formattedData = {
        ...eventData,
        startDate: eventData.startDate ? new Date(eventData.startDate).toISOString() : null,
        endDate: eventData.endDate ? new Date(eventData.endDate).toISOString() : null,
      };
      
      const response = await api.put(`/events/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  },

  // Get events by date range
  getEventsByDateRange: async (startDate, endDate) => {
    try {
      // Ensure dates are in ISO format
      const formattedStartDate = startDate ? new Date(startDate).toISOString() : null;
      const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;
      
      const response = await api.get('/events/range', {
        params: { 
          startDate: formattedStartDate, 
          endDate: formattedEndDate 
        },
      });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching events by date range:', error);
      return [];
    }
  },

  // Register for an event
  registerForEvent: async (eventId) => {
    try {
      const response = await api.post(`/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      console.error(`Error registering for event with ID ${eventId}:`, error);
      throw error;
    }
  },

  // Cancel event registration
  cancelEventRegistration: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling registration for event with ID ${eventId}:`, error);
      throw error;
    }
  },
};

export default eventService; 