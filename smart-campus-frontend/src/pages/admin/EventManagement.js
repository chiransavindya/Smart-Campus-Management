import { Event as EventIcon } from '@mui/icons-material';
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

const EventManagement = () => {
  const events = [
    { id: 1, name: 'Spring Orientation', date: '2023-04-10', location: 'Main Hall', status: 'upcoming' },
    { id: 2, name: 'Career Fair', date: '2023-04-15', location: 'Student Center', status: 'upcoming' },
    { id: 3, name: 'Faculty Meeting', date: '2023-04-08', location: 'Conference Room A', status: 'upcoming' },
    { id: 4, name: 'Research Symposium', date: '2023-04-20', location: 'Science Building', status: 'upcoming' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Event Management
      </Typography>
      
      <Paper>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Event Management
          </Typography>
          <Button variant="contained" startIcon={<EventIcon />}>
            Create New Event
          </Button>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Chip 
                      label={event.status} 
                      color={
                        event.status === 'upcoming' ? 'primary' : 
                        event.status === 'ongoing' ? 'success' : 'error'
                      } 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>
                    <Button size="small">Attendees</Button>
                    <Button size="small" color="error">Cancel</Button>
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

export default EventManagement; 