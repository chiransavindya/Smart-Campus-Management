import {
    Assessment as AssessmentIcon,
    Business as BusinessIcon,
    Event as EventIcon,
    Notifications as NotificationsIcon,
    People as PeopleIcon,
    PieChart as PieChartIcon,
    Room as RoomIcon,
    Security as SecurityIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  // For statistics that don't change, use const instead of state
  const stats = {
    users: 248,
    resources: 56,
    events: 12,
    uptime: '99.9%'
  };
  
  // For data that doesn't change, use const instead of state
  const resourceUtilization = [
    { name: 'Classrooms', usage: 76 },
    { name: 'Labs', usage: 82 },
    { name: 'Conference Rooms', usage: 45 },
    { name: 'Equipment', usage: 62 }
  ];
  
  const recentActivity = [
    { id: 1, action: 'User Created', user: 'admin', timestamp: '2023-04-05 14:22:05' },
    { id: 2, action: 'Resource Added', user: 'admin', timestamp: '2023-04-05 13:15:20' },
    { id: 3, action: 'Event Scheduled', user: 'jane@example.com', timestamp: '2023-04-05 11:45:10' },
    { id: 4, action: 'System Update', user: 'system', timestamp: '2023-04-05 02:00:00' },
  ];
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'lecturer', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'student', status: 'inactive' },
  ];
  
  const resources = [
    { id: 1, name: 'Lecture Hall A', type: 'room', capacity: 200, status: 'available' },
    { id: 2, name: 'Computer Lab 101', type: 'lab', capacity: 30, status: 'in-use' },
    { id: 3, name: 'Conference Room B', type: 'room', capacity: 20, status: 'available' },
    { id: 4, name: 'Projector XD-500', type: 'equipment', status: 'available' },
  ];
  
  const events = [
    { id: 1, name: 'Spring Orientation', date: '2023-04-10', location: 'Main Hall', status: 'upcoming' },
    { id: 2, name: 'Career Fair', date: '2023-04-15', location: 'Student Center', status: 'upcoming' },
    { id: 3, name: 'Faculty Meeting', date: '2023-04-08', location: 'Conference Room A', status: 'upcoming' },
    { id: 4, name: 'Research Symposium', date: '2023-04-20', location: 'Science Building', status: 'upcoming' },
  ];
  
  const securityLogs = [
    { id: 1, action: 'Login Attempt', user: 'robert@example.com', status: 'success', timestamp: '2023-04-05 10:32:15' },
    { id: 2, action: 'Permission Change', user: 'admin', status: 'success', timestamp: '2023-04-05 09:45:30' },
    { id: 3, action: 'Login Attempt', user: 'john@example.com', status: 'failed', timestamp: '2023-04-05 08:20:45' },
    { id: 4, action: 'Data Export', user: 'jane@example.com', status: 'success', timestamp: '2023-04-04 16:10:22' },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome, {user?.name}
        </Typography>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="admin tabs" 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" icon={<PieChartIcon />} iconPosition="start" />
          <Tab label="User Management" icon={<PeopleIcon />} iconPosition="start" />
          <Tab label="Resource Management" icon={<BusinessIcon />} iconPosition="start" />
          <Tab label="Event Management" icon={<EventIcon />} iconPosition="start" />
          <Tab label="Security & Compliance" icon={<SecurityIcon />} iconPosition="start" />
          <Tab label="System Settings" icon={<SettingsIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Stat Cards */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h4">
                      {stats.users}
                    </Typography>
                  </Box>
                  <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Resources
                    </Typography>
                    <Typography variant="h4">
                      {stats.resources}
                    </Typography>
                  </Box>
                  <RoomIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Active Events
                    </Typography>
                    <Typography variant="h4">
                      {stats.events}
                    </Typography>
                  </Box>
                  <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      System Uptime
                    </Typography>
                    <Typography variant="h4">
                      {stats.uptime}
                    </Typography>
                  </Box>
                  <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Resource Utilization */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resource Utilization
                </Typography>
                {resourceUtilization.map((resource) => (
                  <Box key={resource.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{resource.name}</Typography>
                      <Typography variant="body2">{resource.usage}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={resource.usage} 
                      color={resource.usage > 80 ? "error" : resource.usage > 60 ? "warning" : "primary"} 
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivity.map((activity) => (
                    <React.Fragment key={activity.id}>
                      <ListItem>
                        <ListItemText
                          primary={activity.action}
                          secondary={`${activity.user} • ${activity.timestamp}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          {/* System Status */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      mr: 1,
                    }}
                  />
                  <Typography>All systems operational</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Last checked: {new Date().toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* User Management Tab */}
      <TabPanel value={tabValue} index={1}>
        <Paper>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              User Management
            </Typography>
            <Button variant="contained" startIcon={<PeopleIcon />}>
              Add New User
            </Button>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={
                          user.role === 'admin' ? 'error' : 
                          user.role === 'lecturer' ? 'primary' : 'default'
                        } 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        color={user.status === 'active' ? 'success' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small">Edit</Button>
                      <Button size="small" color="error">Deactivate</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Resource Management Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Resource Management
            </Typography>
            <Button variant="contained" startIcon={<BusinessIcon />}>
              Add New Resource
            </Button>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={resource.status} 
                        color={
                          resource.status === 'available' ? 'success' : 
                          resource.status === 'in use' ? 'primary' : 
                          'warning'
                        } 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small">Edit</Button>
                      <Button size="small">Reservations</Button>
                      <Button size="small" color="error">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Event Management Tab */}
      <TabPanel value={tabValue} index={3}>
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
      </TabPanel>

      {/* Security & Compliance Tab */}
      <TabPanel value={tabValue} index={4}>
        <Paper>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              Security & Compliance
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Security Logs
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Chip 
                          label={log.status} 
                          color={log.status === 'success' ? 'success' : 'error'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Security Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Two-Factor Authentication" 
                  secondary="Require 2FA for administrative accounts" 
                />
                <Chip label="Enabled" color="success" size="small" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Password Policy" 
                  secondary="Minimum 8 characters with special characters required" 
                />
                <Chip label="Enforced" color="success" size="small" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Session Timeout" 
                  secondary="Automatically log out inactive users after 30 minutes" 
                />
                <Chip label="Enabled" color="success" size="small" />
              </ListItem>
            </List>
          </Box>
        </Paper>
      </TabPanel>

      {/* System Settings Tab */}
      <TabPanel value={tabValue} index={5}>
        <Paper>
          <Typography variant="h6" sx={{ p: 2 }}>
            System Settings
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              General Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="System Name" secondary="Smart Campus Management System" />
                <Button size="small">Edit</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Time Zone" secondary="UTC+00:00" />
                <Button size="small">Edit</Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Email Notifications" secondary="System notification settings for all users" />
                <Button size="small">Configure</Button>
              </ListItem>
            </List>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Maintenance
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" fullWidth>Backup System</Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" fullWidth>Clear Cache</Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" color="error" fullWidth>Reset to Default</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard; 