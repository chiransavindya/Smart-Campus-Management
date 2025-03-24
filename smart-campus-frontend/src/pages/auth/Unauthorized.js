import { Error } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Determine where to redirect the user based on their role
  const handleRedirect = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    switch (user.role) {
      case 'admin':
        navigate('/admin/overview');
        break;
      case 'lecturer':
        navigate('/lecturer/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Error color="error" sx={{ fontSize: 64, mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        
        <Typography variant="body1" paragraph>
          You do not have permission to access this page. This area is restricted to authorized users only.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirect}
            fullWidth
          >
            Go to Dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Unauthorized; 