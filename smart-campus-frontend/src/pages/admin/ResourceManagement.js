import { Business as BusinessIcon } from '@mui/icons-material';
import {
    Box,
    Button,
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

const ResourceManagement = () => {
  const resources = [
    { id: 1, name: 'Lecture Hall A', type: 'room', capacity: 200, status: 'available' },
    { id: 2, name: 'Computer Lab 101', type: 'lab', capacity: 30, status: 'in-use' },
    { id: 3, name: 'Conference Room B', type: 'room', capacity: 20, status: 'available' },
    { id: 4, name: 'Projector XD-500', type: 'equipment', status: 'available' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Resource Management
      </Typography>
      
      <Paper>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Resource Management
          </Typography>
          <Button variant="contained" startIcon={<BusinessIcon />}>
            Add New Resource
          </Button>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.capacity || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={resource.status} 
                      color={
                        resource.status === 'available' ? 'success' : 
                        resource.status === 'in-use' ? 'primary' : 'default'
                      } 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>
                    <Button size="small">Schedule</Button>
                    <Button size="small" color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ResourceManagement; 