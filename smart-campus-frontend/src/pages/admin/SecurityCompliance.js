import {
    Box,
    Chip,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';

const SecurityCompliance = () => {
  const securityLogs = [
    { id: 1, action: 'Login Attempt', user: 'robert@example.com', status: 'success', timestamp: '2023-04-05 10:32:15' },
    { id: 2, action: 'Permission Change', user: 'admin', status: 'success', timestamp: '2023-04-05 09:45:30' },
    { id: 3, action: 'Login Attempt', user: 'john@example.com', status: 'failed', timestamp: '2023-04-05 08:20:45' },
    { id: 4, action: 'Data Export', user: 'jane@example.com', status: 'success', timestamp: '2023-04-04 16:10:22' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Security & Compliance
      </Typography>
      
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            Security & Compliance
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Security Logs
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {securityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Chip 
                        label={log.status} 
                        color={log.status === 'success' ? 'success' : 'error'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Access Controls
          </Typography>
          <Typography variant="body2">
            The system implements role-based access control (RBAC) to ensure users can only access features and data appropriate for their roles. Access privileges are regularly audited and reviewed.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Data Protection
          </Typography>
          <Typography variant="body2">
            All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols. Personal data handling complies with relevant privacy regulations.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecurityCompliance; 