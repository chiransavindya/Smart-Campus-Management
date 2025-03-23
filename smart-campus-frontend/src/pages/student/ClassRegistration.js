import { CheckCircle, Class, Person, Schedule } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const ClassRegistration = () => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    // Mock data - in a real app this would be fetched from the server
    setAvailableClasses([
      {
        id: '101',
        name: 'Introduction to Computer Science',
        code: 'CS101',
        instructor: 'Dr. Smith',
        schedule: 'Monday/Wednesday 9:00 AM - 10:30 AM',
        location: 'Room 101',
        capacity: 30,
        enrolled: 18,
        credits: 3,
        description: 'Introductory course covering basic concepts of computer science.',
      },
      {
        id: '102',
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        instructor: 'Dr. Johnson',
        schedule: 'Tuesday/Thursday 2:00 PM - 3:30 PM',
        location: 'Room 205',
        capacity: 25,
        enrolled: 15,
        credits: 4,
        description: 'Advanced course covering data structures and algorithm analysis.',
      },
      {
        id: '103',
        name: 'Calculus I',
        code: 'MATH101',
        instructor: 'Dr. Williams',
        schedule: 'Monday/Wednesday/Friday 11:00 AM - 12:00 PM',
        location: 'Room 302',
        capacity: 40,
        enrolled: 32,
        credits: 4,
        description: 'Introduction to differential and integral calculus.',
      },
      {
        id: '104',
        name: 'Introduction to Psychology',
        code: 'PSYCH101',
        instructor: 'Dr. Brown',
        schedule: 'Tuesday/Thursday 10:00 AM - 11:30 AM',
        location: 'Auditorium A',
        capacity: 100,
        enrolled: 78,
        credits: 3,
        description: 'Introduction to the principles of psychology.',
      },
    ]);

    setRegisteredClasses([
      {
        id: '105',
        name: 'English Composition',
        code: 'ENG101',
        instructor: 'Dr. Davis',
        schedule: 'Monday/Wednesday 1:00 PM - 2:30 PM',
        location: 'Room 204',
        credits: 3,
        grade: null,
      },
      {
        id: '106',
        name: 'Physics I',
        code: 'PHYS101',
        instructor: 'Dr. Wilson',
        schedule: 'Tuesday/Thursday 9:00 AM - 10:30 AM',
        location: 'Science Building 105',
        credits: 4,
        grade: null,
      },
    ]);
  }, []);

  const handleRegister = (classItem) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just move it from available to registered
    setRegisteredClasses([...registeredClasses, classItem]);
    setAvailableClasses(availableClasses.filter(c => c.id !== classItem.id));
    setSnackbar({
      open: true,
      message: `Successfully registered for ${classItem.name}`,
      severity: 'success'
    });
  };

  const handleDrop = (classItem) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just move it from registered to available
    setAvailableClasses([...availableClasses, classItem]);
    setRegisteredClasses(registeredClasses.filter(c => c.id !== classItem.id));
    setSnackbar({
      open: true,
      message: `Successfully dropped ${classItem.name}`,
      severity: 'info'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Class Registration
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Register for classes or manage your current registrations.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Current registrations */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Schedule color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Currently Registered Classes</Typography>
            </Box>
            <Divider />
            {registeredClasses.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="textSecondary">
                  You are not registered for any classes yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Instructor</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Credits</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registeredClasses.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body1">{cls.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{cls.code}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{cls.instructor}</TableCell>
                        <TableCell>{cls.schedule}</TableCell>
                        <TableCell>{cls.credits}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDrop(cls)}
                          >
                            Drop
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        {/* Available classes */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Class color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Available Classes</Typography>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ p: 2 }}>
              {availableClasses.map((cls) => (
                <Grid item xs={12} md={6} key={cls.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6">{cls.name}</Typography>
                        <Typography variant="subtitle2" color="primary">{cls.code}</Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Person fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{cls.instructor}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Schedule fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{cls.schedule}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Location:</strong> {cls.location}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Credits:</strong> {cls.credits}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                              <strong>Capacity:</strong> {cls.enrolled}/{cls.capacity}
                            </Typography>
                            <Box 
                              sx={{
                                width: '100%',
                                height: 8,
                                bgcolor: 'background.paper',
                                borderRadius: 5,
                                overflow: 'hidden',
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${(cls.enrolled / cls.capacity) * 100}%`,
                                  height: '100%',
                                  bgcolor: cls.enrolled >= cls.capacity ? 'error.main' : 'success.main',
                                }}
                              />
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: 'right', mt: 2 }}>
                            <Button
                              variant="contained"
                              disabled={cls.enrolled >= cls.capacity}
                              endIcon={<CheckCircle />}
                              onClick={() => handleRegister(cls)}
                            >
                              Register
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClassRegistration; 