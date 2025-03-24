import { Notifications as NotificationsIcon, Settings as SettingsIcon } from '@mui/icons-material';
import {
    Box,
    Button,
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

const SystemSettings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      
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
    </Box>
  );
};

export default SystemSettings; 