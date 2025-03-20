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

export const scheduleService = {
  // Get user's schedule
  getUserSchedule: async () => {
    const response = await api.get('/schedule/user');
    return response.data;
  },

  // Get class schedule by ID
  getClassSchedule: async (id) => {
    const response = await api.get(`/schedule/class/${id}`);
    return response.data;
  },

  // Get schedule by date range
  getScheduleByDateRange: async (startDate, endDate) => {
    const response = await api.get('/schedule/range', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Create class schedule (admin/lecturer only)
  createClassSchedule: async (scheduleData) => {
    const response = await api.post('/schedule/class', scheduleData);
    return response.data;
  },

  // Update class schedule (admin/lecturer only)
  updateClassSchedule: async (id, scheduleData) => {
    const response = await api.put(`/schedule/class/${id}`, scheduleData);
    return response.data;
  },

  // Delete class schedule (admin/lecturer only)
  deleteClassSchedule: async (id) => {
    const response = await api.delete(`/schedule/class/${id}`);
    return response.data;
  },

  // Get lecturer's classes
  getLecturerClasses: async () => {
    const response = await api.get('/schedule/lecturer/classes');
    return response.data;
  },

  // Get student's classes
  getStudentClasses: async () => {
    const response = await api.get('/schedule/student/classes');
    return response.data;
  },

  // Register for a class (student only)
  registerForClass: async (classId) => {
    const response = await api.post(`/schedule/class/${classId}/register`);
    return response.data;
  },

  // Drop a class (student only)
  dropClass: async (classId) => {
    const response = await api.delete(`/schedule/class/${classId}/register`);
    return response.data;
  },

  // Get class attendance
  getClassAttendance: async (classId) => {
    const response = await api.get(`/schedule/class/${classId}/attendance`);
    return response.data;
  },

  // Mark attendance (lecturer only)
  markAttendance: async (classId, attendanceData) => {
    const response = await api.post(`/schedule/class/${classId}/attendance`, attendanceData);
    return response.data;
  },
};

export default scheduleService; 