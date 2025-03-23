import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'lecturer':
          navigate('/lecturer/dashboard', { replace: true });
          break;
        case 'student':
          navigate('/student/dashboard', { replace: true });
          break;
        default:
          // If role is unknown, show generic dashboard
          break;
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // This will only show briefly before redirect
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="body1">
        Redirecting to your dashboard...
      </Typography>
    </Box>
  );
};

export default Dashboard; 