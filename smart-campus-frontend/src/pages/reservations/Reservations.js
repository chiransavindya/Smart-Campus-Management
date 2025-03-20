import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import reservationService from '../../services/api/reservationService';

const Reservations = () => {
  const [resources, setResources] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resourcesData, reservationsData] = await Promise.all([
        reservationService.getAllResources(),
        reservationService.getUserReservations(),
      ]);
      setResources(resourcesData);
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load resources and reservations');
    }
  };

  const handleOpen = (reservation = null) => {
    setSelectedReservation(reservation);
    if (reservation) {
      reset(reservation);
    } else {
      reset({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReservation(null);
    reset({});
    setError(null);
  };

  const onSubmit = async (data) => {
    try {
      setError(null);
      if (selectedReservation) {
        await reservationService.updateReservation(selectedReservation.id, data);
      } else {
        await reservationService.createReservation(data);
      }
      loadData();
      handleClose();
    } catch (error) {
      console.error('Error saving reservation:', error);
      setError(error.response?.data?.message || 'Failed to save reservation');
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await reservationService.cancelReservation(reservationId);
        loadData();
      } catch (error) {
        console.error('Error deleting reservation:', error);
        setError('Failed to cancel reservation');
      }
    }
  };

  const getResourceName = (resourceId) => {
    const resource = resources.find((r) => r.id === resourceId);
    return resource ? resource.name : 'Unknown Resource';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Resource Reservations</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Make Reservation
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {reservations.map((reservation) => (
          <Grid item xs={12} sm={6} md={4} key={reservation.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {getResourceName(reservation.resourceId)}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(reservation.startTime).toLocaleString()} -{' '}
                  {new Date(reservation.endTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {reservation.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Purpose: {reservation.purpose}
                </Typography>
              </CardContent>
              <CardContent>
                <IconButton
                  size="small"
                  onClick={() => handleOpen(reservation)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(reservation.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedReservation ? 'Edit Reservation' : 'Make New Reservation'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              select
              label="Resource"
              margin="normal"
              {...register('resourceId', { required: 'Resource is required' })}
              error={!!errors.resourceId}
              helperText={errors.resourceId?.message}
            >
              {resources.map((resource) => (
                <MenuItem key={resource.id} value={resource.id}>
                  {resource.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Start Time"
              margin="normal"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register('startTime', { required: 'Start time is required' })}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
            />
            <TextField
              fullWidth
              label="End Time"
              margin="normal"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register('endTime', { required: 'End time is required' })}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
            />
            <TextField
              fullWidth
              label="Purpose"
              margin="normal"
              multiline
              rows={4}
              {...register('purpose', { required: 'Purpose is required' })}
              error={!!errors.purpose}
              helperText={errors.purpose?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedReservation ? 'Update' : 'Reserve'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Reservations; 