import {
    Add as AddIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import scheduleService from '../../services/api/scheduleService';

const Schedule = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loadSchedule = useCallback(async () => {
    try {
      let data;
      if (user?.role === 'student') {
        data = await scheduleService.getStudentClasses();
      } else if (user?.role === 'lecturer') {
        data = await scheduleService.getLecturerClasses();
      } else {
        data = await scheduleService.getUserSchedule();
      }
      setSchedule(data);
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
  }, [user?.role]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const handleOpen = (classItem = null) => {
    setSelectedClass(classItem);
    if (classItem) {
      reset(classItem);
    } else {
      reset({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null);
    reset({});
  };

  const onSubmit = async (data) => {
    try {
      if (selectedClass) {
        await scheduleService.updateClassSchedule(selectedClass.id, data);
      } else {
        await scheduleService.createClassSchedule(data);
      }
      loadSchedule();
      handleClose();
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const canManageSchedule = user?.role === 'admin' || user?.role === 'lecturer';

  const renderScheduleTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
            <TableCell>Saturday</TableCell>
            <TableCell>Sunday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((classItem) => (
            <TableRow key={classItem.id}>
              <TableCell>
                {new Date(classItem.startTime).toLocaleTimeString()} -{' '}
                {new Date(classItem.endTime).toLocaleTimeString()}
              </TableCell>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <TableCell key={day}>
                  {classItem[day] ? classItem.name : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Schedule</Typography>
        {canManageSchedule && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Class
          </Button>
        )}
      </Box>

      {renderScheduleTable()}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedClass ? 'Edit Class' : 'Add New Class'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              label="Class Name"
              margin="normal"
              {...register('name', { required: 'Class name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Start Time"
              margin="normal"
              type="time"
              InputLabelProps={{ shrink: true }}
              {...register('startTime', { required: 'Start time is required' })}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
            />
            <TextField
              fullWidth
              label="End Time"
              margin="normal"
              type="time"
              InputLabelProps={{ shrink: true }}
              {...register('endTime', { required: 'End time is required' })}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
            />
            <TextField
              fullWidth
              select
              label="Room"
              margin="normal"
              {...register('room', { required: 'Room is required' })}
              error={!!errors.room}
              helperText={errors.room?.message}
            >
              <MenuItem value="101">Room 101</MenuItem>
              <MenuItem value="102">Room 102</MenuItem>
              <MenuItem value="103">Room 103</MenuItem>
              <MenuItem value="104">Room 104</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Capacity"
              margin="normal"
              type="number"
              {...register('capacity', { required: 'Capacity is required' })}
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
            >
              <MenuItem value="20">20 students</MenuItem>
              <MenuItem value="30">30 students</MenuItem>
              <MenuItem value="40">40 students</MenuItem>
              <MenuItem value="50">50 students</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedClass ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Schedule; 