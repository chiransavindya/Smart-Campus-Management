import {
    Assessment as AssessmentIcon,
    Event as EventIcon,
    Notifications as NotificationsIcon,
    People as PeopleIcon,
    Room as RoomIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const renderAdminDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            System Overview
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Total Users"
                secondary="150"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Active Events"
                secondary="12"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText
                primary="Resource Usage"
                secondary="75%"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="New User Registration"
                secondary="2 minutes ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Resource Reservation"
                secondary="15 minutes ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Event Created"
                secondary="1 hour ago"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Create Event" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="View Reports" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderLecturerDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Today's Schedule
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Introduction to Computer Science"
                secondary="9:00 AM - 10:30 AM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Data Structures"
                secondary="2:00 PM - 3:30 PM"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Upcoming Events
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Department Meeting"
                secondary="Tomorrow, 10:00 AM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Research Presentation"
                secondary="Friday, 2:00 PM"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="View Schedule" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary="Book Resources" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Send Announcement" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderStudentDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Today's Classes
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Mathematics"
                secondary="9:00 AM - 10:30 AM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Physics"
                secondary="2:00 PM - 3:30 PM"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Upcoming Events
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Career Fair"
                secondary="Tomorrow, 10:00 AM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sports Day"
                secondary="Friday, 9:00 AM"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="View Schedule" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary="Book Resources" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="View Notifications" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      {user?.role === 'admin' && renderAdminDashboard()}
      {user?.role === 'lecturer' && renderLecturerDashboard()}
      {user?.role === 'student' && renderStudentDashboard()}
    </Box>
  );
};

export default Dashboard; 