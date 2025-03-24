import { Box } from '@mui/material';
import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {children}
    </Box>
  );
};

export default AdminLayout; 