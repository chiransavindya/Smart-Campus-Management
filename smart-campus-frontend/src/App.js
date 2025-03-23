import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Auth components
import { AuthProvider, useAuth } from './context/AuthContext';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Layout components
import Navigation from './components/Navigation';
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/dashboard/Dashboard';
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

// Feature components
import Events from './pages/events/Events';
import Profile from './pages/profile/Profile';
import Reservations from './pages/reservations/Reservations';
import Resources from './pages/resources/Resources';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

// Role-based Route Component
const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Dashboard - redirects to role-specific dashboard */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            
            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            
            {/* Lecturer Routes */}
            <Route
              path="/lecturer/*"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={['lecturer']}>
                    <LecturerDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            
            {/* Feature Routes */}
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservations"
              element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* Default redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
