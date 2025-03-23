import {
    Assignment,
    Book,
    CalendarToday,
    EventNote,
    Grade,
    HowToReg,
    Notifications,
    People,
    School
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ClassRegistration from './ClassRegistration';
import GradeViewer from './GradeViewer';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - in a real app, these would be API calls
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Classes for today
      setClasses([
        { id: 1, name: 'Introduction to Computer Science', time: '9:00 AM - 10:30 AM', location: 'Room 101', instructor: 'Dr. Smith' },
        { id: 2, name: 'Calculus I', time: '11:00 AM - 12:30 PM', location: 'Room 203', instructor: 'Dr. Johnson' },
        { id: 3, name: 'English Composition', time: '2:00 PM - 3:30 PM', location: 'Room 305', instructor: 'Prof. Williams' }
      ]);

      // Upcoming events
      setEvents([
        { id: 1, title: 'Midterm Exam - CS101', date: 'Oct 15, 2023', time: '10:00 AM', location: 'Exam Hall A' },
        { id: 2, title: 'Career Fair', date: 'Oct 20, 2023', time: '1:00 PM - 5:00 PM', location: 'Student Center' },
        { id: 3, title: 'CS Club Meeting', date: 'Oct 10, 2023', time: '4:00 PM', location: 'Room 101' }
      ]);

      // Notifications
      setNotifications([
        { id: 1, message: 'Assignment due tomorrow: CS101 Programming Exercise', time: '1 hour ago', isRead: false },
        { id: 2, message: 'New grade posted for MATH101', time: '3 hours ago', isRead: true },
        { id: 3, message: 'Campus event reminder: Career Fair next week', time: '1 day ago', isRead: true }
      ]);
    };

    fetchData();
  }, []);

  // This is the overview/home page of the student dashboard
  const DashboardHome = () => (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || 'Student'}!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here's what's happening today - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Today's Schedule</Typography>
            </Box>
            <Divider />
            <List sx={{ width: '100%' }}>
              {classes.map((cls) => (
                <ListItem key={cls.id} divider>
                  <ListItemIcon>
                    <School color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={cls.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {cls.time} • {cls.location}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="textSecondary">
                          Instructor: {cls.instructor}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Notifications color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                Mark all as read
              </Typography>
            </Box>
            <Divider />
            <List sx={{ width: '100%' }}>
              {notifications.map((notification) => (
                <ListItem 
                  key={notification.id} 
                  divider 
                  sx={{ 
                    backgroundColor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.08)'
                  }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <EventNote color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Upcoming Events</Typography>
            </Box>
            <Divider />
            <List sx={{ width: '100%' }}>
              {events.map((event) => (
                <ListItem key={event.id} divider>
                  <ListItemIcon>
                    <CalendarToday color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {event.date} • {event.time}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="textSecondary">
                          Location: {event.location}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Quick Actions</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<HowToReg />}
                    component={Link}
                    to="/student/registration"
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Class Registration
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Grade />}
                    component={Link}
                    to="/student/grades"
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    View Grades
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<People />}
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Study Groups
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Book />}
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Library Resources
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Course Materials */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Book color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Course Materials</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {classes.map((cls) => (
                  <Grid item xs={12} sm={6} md={4} key={cls.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {cls.name}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            Instructor: {cls.instructor}
                          </Typography>
                        </Box>
                        <Button variant="contained" size="small" fullWidth>
                          Access Materials
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/registration" element={<ClassRegistration />} />
        <Route path="/grades" element={<GradeViewer />} />
      </Routes>
    </Container>
  );
};

export default StudentDashboard; 