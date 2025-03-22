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
    CircularProgress,
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
import { useForm } from 'react-hook-form';
import reservationService from '../../services/api/reservationService';

const Reservations = () => {
  const [resources, setResources] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resourcesLoading, setResourcesLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Using useCallback to memoize the loadResources function
  const loadResources = useCallback(async () => {
    setResourcesLoading(true);
    try {
      const resourcesData = await reservationService.getAllResources();
      
      // Ensure resourcesData is an array
      if (Array.isArray(resourcesData)) {
        setResources(resourcesData);
      } else {
        console.error('Resources data is not an array:', resourcesData);
        setResources([]);
        setError('Invalid resource data format received from server');
      }
      
    } catch (error) {
      console.error('Error loading resources:', error);
      setResources([]);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setResourcesLoading(false);
    }
  }, []);

  // Using useCallback to memoize the loadData function
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Load reservations and resources separately to handle errors more gracefully
      const reservationsData = await reservationService.getUserReservations();
      
      // Ensure reservationsData is an array
      if (Array.isArray(reservationsData)) {
        setReservations(reservationsData);
      } else {
        console.error('Reservations data is not an array:', reservationsData);
        setReservations([]);
        setError('Invalid reservation data format received from server');
      }
      
      // Now load resources
      await loadResources();
    } catch (error) {
      console.error('Error loading reservations:', error);
      setReservations([]);
      setError('Failed to load reservations. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [loadResources]);

  useEffect(() => {
    loadData();
  }, [loadData]); // Now properly including loadData as a dependency

  const handleOpen = (reservation = null) => {
    // Ensure resources are loaded before opening the dialog
    if (resources.length === 0) {
      setResourcesLoading(true);
      reservationService.getAllResources()
        .then(data => {
          if (Array.isArray(data)) {
            setResources(data);
          } else {
            console.error('Resources data is not an array:', data);
            setResources([]);
            setError('Failed to load resources: Invalid data format');
          }
          openDialog(reservation);
        })
        .catch(error => {
          console.error('Error loading resources:', error);
          setError('Failed to load resources. Please try again later.');
        })
        .finally(() => {
          setResourcesLoading(false);
        });
    } else {
      openDialog(reservation);
    }
  };
  
  const openDialog = (reservation) => {
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

  // Ensure reservations is an array before rendering
  const reservationsArray = Array.isArray(reservations) ? reservations : [];

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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : reservationsArray.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          You have no reservations yet. Click "Make Reservation" to create one.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {reservationsArray.map((reservation) => (
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
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedReservation ? 'Edit Reservation' : 'Make New Reservation'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {resourcesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : resources.length === 0 ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                Failed to load resources. Please try again.
              </Alert>
            ) : (
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
            )}
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
            <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting || resources.length === 0}
            >
              {isSubmitting ? <CircularProgress size={24} /> : selectedReservation ? 'Update' : 'Reserve'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Reservations; 