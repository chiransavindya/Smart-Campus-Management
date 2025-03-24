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
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // Using useCallback to memoize the loadData function
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    console.log("Starting to load resources and reservations");
    
    try {
      // Load resources first since they're required for displaying reservations
      console.log("Loading resources...");
      const resourcesData = await reservationService.getAllResources();
      
      // Ensure resourcesData is an array
      if (Array.isArray(resourcesData)) {
        console.log(`Successfully loaded ${resourcesData.length} resources`);
        setResources(resourcesData);
      } else {
        console.error('Resources data is not an array:', resourcesData);
        setResources([]);
        setError('Invalid resource data format received from server');
      }
      
      // Now load reservations
      console.log("Loading reservations...");
      const reservationsData = await reservationService.getUserReservations();
      
      // Ensure reservationsData is an array
      if (Array.isArray(reservationsData)) {
        console.log(`Successfully loaded ${reservationsData.length} reservations`);
        setReservations(reservationsData);
      } else {
        console.error('Reservations data is not an array:', reservationsData);
        setReservations([]);
        setError((prev) => prev || 'Invalid reservation data format received from server');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.message?.includes('resource')) {
        setError('Failed to load resources. The server might be unreachable. Please try again later.');
      } else {
        setError('Failed to load reservations. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]); // Now properly including loadData as a dependency

  const handleOpen = (reservation = null) => {
    // Ensure resources are loaded before opening the dialog
    if (resources.length === 0) {
      setResourcesLoading(true);
      setError(null); // Clear any previous errors
      
      console.log("Attempting to load resources before opening dialog");
      
      // Try to load resources with a specific timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );
      
      Promise.race([
        reservationService.getAllResources(),
        timeoutPromise
      ])
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            console.log(`Successfully loaded ${data.length} resources for dialog`);
            setResources(data);
            openDialog(reservation);
          } else if (Array.isArray(data) && data.length === 0) {
            console.warn('No resources available:', data);
            setError('No resources available for reservation. Please contact an administrator.');
          } else {
            console.error('Resources data is not an array:', data);
            setResources([]);
            setError('Failed to load resources: Invalid data format received from server');
          }
        })
        .catch(error => {
          console.error('Error loading resources for dialog:', error);
          if (error.message === 'Request timed out') {
            setError('Request timed out. The server might be unreachable. Please check your connection and try again.');
          } else {
            setError('Failed to load resources. The server might be unreachable. Please try again later or contact support.');
          }
        })
        .finally(() => {
          setResourcesLoading(false);
        });
    } else {
      console.log(`Using ${resources.length} preloaded resources for dialog`);
      openDialog(reservation);
    }
  };
  
  const openDialog = (reservation) => {
    setSelectedReservation(reservation);
    if (reservation) {
      // Format dates for the form
      const formattedReservation = {
        ...reservation,
        startTime: formatDateTimeForInput(reservation.startTime),
        endTime: formatDateTimeForInput(reservation.endTime)
      };
      reset(formattedReservation);
    } else {
      reset({});
    }
    setOpen(true);
  };

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

  const handleClose = () => {
    setOpen(false);
    setSelectedReservation(null);
    reset({});
    setError(null);
  };

  const onSubmit = async (data) => {
    try {
      setError(null);
      
      // Validate required fields
      if (!data.resourceId) {
        setError('Please select a resource');
        return;
      }
      
      if (!data.startTime) {
        setError('Please specify a start time');
        return;
      }
      
      if (!data.endTime) {
        setError('Please specify an end time');
        return;
      }
      
      if (!data.purpose) {
        setError('Please specify a purpose');
        return;
      }
      
      // Check if end time is after start time
      if (new Date(data.endTime) <= new Date(data.startTime)) {
        setError('End time must be after start time');
        return;
      }
      
      // Format dates for API
      const formattedStartTime = new Date(data.startTime).toISOString();
      const formattedEndTime = new Date(data.endTime).toISOString();
      
      // Check for conflicts before saving
      try {
        const availabilityCheck = await reservationService.getResourceAvailability(
          data.resourceId,
          formattedStartTime,
          formattedEndTime
        );
        
        if (!availabilityCheck.available) {
          setError('This resource is not available during the selected time. Please choose a different time or resource.');
          return;
        }
      } catch (err) {
        console.error('Error checking resource availability:', err);
        // Continue with submission even if availability check fails
      }
      
      // Ensure dates are properly parsed into Date objects
      const formattedData = {
        ...data,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };
      
      console.log('Submitting reservation data:', formattedData);
      
      if (selectedReservation) {
        await reservationService.updateReservation(selectedReservation.id, formattedData);
      } else {
        await reservationService.createReservation(formattedData);
      }
      loadData();
      handleClose();
    } catch (error) {
      console.error('Error saving reservation:', error);
      setError(error.response?.data?.message || error.message || 'Failed to save reservation. Please try again.');
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

  const renderDialogContent = () => {
    if (resourcesLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    if (error && resources.length === 0) {
      return (
        <Box sx={{ py: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              onClick={() => handleOpen(selectedReservation)}
              sx={{ mt: 2 }}
            >
              Retry Loading Resources
            </Button>
          </Box>
        </Box>
      );
    }
    
    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.resourceId}>
              <InputLabel id="resource-select-label">Resource</InputLabel>
              <Controller
                name="resourceId"
                control={control}
                defaultValue=""
                rules={{ required: 'Resource is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="resource-select-label"
                    label="Resource"
                  >
                    {resources.map((resource) => (
                      <MenuItem key={resource.id} value={resource.id}>
                        {resource.name} ({resource.type})
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.resourceId && (
                <Typography color="error" variant="caption">
                  {errors.resourceId.message}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Controller
              name="startTime"
              control={control}
              rules={{ 
                required: 'Start time is required',
                validate: {
                  hasTimeComponent: value => (!!value && value.includes('T')) || 'Please select both date and time'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Start Time"
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startTime}
                  helperText={errors.startTime?.message}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Controller
              name="endTime"
              control={control}
              rules={{ 
                required: 'End time is required',
                validate: {
                  hasTimeComponent: value => (!!value && value.includes('T')) || 'Please select both date and time',
                  isAfterStart: (value, { startTime }) => {
                    if (!startTime || !value) return true;
                    return new Date(value) > new Date(startTime) || 'End time must be after start time';
                  }
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="End Time"
                  margin="normal"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endTime}
                  helperText={errors.endTime?.message}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={loadData}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => handleOpen()}
              disabled={resources.length === 0}
            >
              Make Reservation
            </Button>
          </Box>

          {reservationsArray.length === 0 ? (
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                You don't have any reservations yet.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => handleOpen()}
                disabled={resources.length === 0}
              >
                Make your first reservation
              </Button>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {reservationsArray.map((reservation) => (
                <Grid item xs={12} md={6} key={reservation.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {getResourceName(reservation.resourceId)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Purpose: {reservation.purpose}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        From: {new Date(reservation.startTime).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        To: {new Date(reservation.endTime).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {reservation.status}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                          onClick={() => handleOpen(reservation)}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(reservation.id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedReservation ? 'Edit Reservation' : 'Make New Reservation'}
        </DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!resourcesLoading && resources.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? 'Saving...' : (selectedReservation ? 'Update' : 'Reserve')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reservations; 