import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import eventService from '../../services/api/eventService';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const loadEvents = useCallback(async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Helper to format date for datetime-local input
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // Format: YYYY-MM-DDThh:mm
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
  };

  const handleOpen = (event = null) => {
    setSelectedEvent(event);
    if (event) {
      // Format dates for the form
      const formattedEvent = {
        ...event,
        startDate: formatDateTimeForInput(event.startDate),
        endDate: formatDateTimeForInput(event.endDate)
      };
      reset(formattedEvent);
    } else {
      reset({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    reset({});
  };

  const onSubmit = async (data) => {
    try {
      // Ensure dates are properly parsed into Date objects
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      };
      
      if (selectedEvent) {
        await eventService.updateEvent(selectedEvent.id, formattedData);
      } else {
        await eventService.createEvent(formattedData);
      }
      loadEvents();
      handleClose();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(eventId);
        loadEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const canManageEvents = user?.role === 'admin' || user?.role === 'lecturer';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Events</Typography>
        {canManageEvents && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Create Event
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(event.startDate).toLocaleDateString()} -{' '}
                  {new Date(event.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Location: {event.location}
                </Typography>
              </CardContent>
              {canManageEvents && (
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(event)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(event.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              fullWidth
              label="Location"
              margin="normal"
              {...register('location', { required: 'Location is required' })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
            <Controller
              name="startDate"
              control={control}
              rules={{ 
                required: 'Start date is required',
                validate: {
                  hasTimeComponent: value => (!!value && value.includes('T')) || 'Please select both date and time'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Start Date"
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              rules={{ 
                required: 'End date is required',
                validate: {
                  hasTimeComponent: value => (!!value && value.includes('T')) || 'Please select both date and time',
                  isAfterStart: (value, { startDate }) => {
                    if (!startDate || !value) return true;
                    return new Date(value) > new Date(startDate) || 'End date must be after start date';
                  }
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="End Date"
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
            <TextField
              fullWidth
              select
              label="Event Type"
              margin="normal"
              {...register('type', { required: 'Event type is required' })}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <MenuItem value="academic">Academic</MenuItem>
              <MenuItem value="social">Social</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedEvent ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Events; 