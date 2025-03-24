import {
    Assessment as AssessmentIcon,
    Event as EventIcon,
    People as PeopleIcon,
    Room as RoomIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import React from 'react';

const Overview = () => {
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
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
    </Box>
  );
};

export default Overview; 