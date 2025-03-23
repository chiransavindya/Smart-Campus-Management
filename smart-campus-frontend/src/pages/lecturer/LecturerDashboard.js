import {
    Assignment,
    Book,
    CalendarToday,
    EventNote,
    Groups,
    Notifications,
    PersonAdd,
    PieChart,
    School,
    Timeline
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
import AttendanceTracker from './AttendanceTracker';
import LecturerCourseManager from './LecturerCourseManager';

const LecturerDashboard = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - in a real app, these would be API calls
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Classes for today
      setClasses([
        { id: 1, name: 'Introduction to Computer Science', time: '9:00 AM - 10:30 AM', location: 'Room 101', students: 25 },
        { id: 2, name: 'Data Structures and Algorithms', time: '2:00 PM - 3:30 PM', location: 'Room 205', students: 18 }
      ]);

      // Upcoming events
      setEvents([
        { id: 1, title: 'Faculty Meeting', date: 'Oct 10, 2023', time: '3:00 PM', location: 'Conference Room A' },
        { id: 2, title: 'Department Workshop', date: 'Oct 15, 2023', time: '10:00 AM', location: 'Auditorium' },
        { id: 3, title: 'Research Symposium', date: 'Oct 20, 2023', time: '9:00 AM - 5:00 PM', location: 'Science Building' }
      ]);

      // Statistics
      setStats({
        totalStudents: 143,
        totalCourses: 4,
        avgAttendance: 82,
        avgGrade: 'B+'
      });

      // Notifications
      setNotifications([
        { id: 1, message: 'New assignment submissions: 5 students', time: '30 minutes ago', isRead: false },
        { id: 2, message: 'Faculty meeting reminder tomorrow at 3:00 PM', time: '2 hours ago', isRead: true },
        { id: 3, message: 'New course evaluation results available', time: '1 day ago', isRead: true }
      ]);
    };

    fetchData();
  }, []);

  // This is the overview/home page of the lecturer dashboard
  const DashboardHome = () => (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || 'Professor'}!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here's your overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Students</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 1 }}>{stats.totalStudents}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Across all courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Book color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Courses</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 1 }}>{stats.totalCourses}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Current semester
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Attendance</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 1 }}>{stats.avgAttendance}%</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Average attendance rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PieChart color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Average Grade</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 1 }}>{stats.avgGrade}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Across all courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Classes */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Today's Classes</Typography>
            </Box>
            <Divider />
            <List sx={{ width: '100%' }}>
              {classes.length > 0 ? classes.map((cls) => (
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
                          Students: {cls.students}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button 
                    variant="outlined" 
                    size="small" 
                    component={Link}
                    to="/lecturer/attendance"
                  >
                    Take Attendance
                  </Button>
                </ListItem>
              )) : (
                <ListItem>
                  <ListItemText
                    primary="No classes scheduled for today"
                    secondary="Enjoy your day off!"
                  />
                </ListItem>
              )}
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
                    startIcon={<Groups />}
                    component={Link}
                    to="/lecturer/courses"
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Manage Courses
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<PersonAdd />}
                    component={Link}
                    to="/lecturer/attendance"
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Attendance Tracker
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Assignment />}
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Grade Assignments
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<EventNote />}
                    sx={{ justifyContent: 'flex-start', mb: 2 }}
                  >
                    Schedule Office Hours
                  </Button>
                </Grid>
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
        <Route path="/courses" element={<LecturerCourseManager />} />
        <Route path="/attendance" element={<AttendanceTracker />} />
      </Routes>
    </Container>
  );
};

export default LecturerDashboard; 