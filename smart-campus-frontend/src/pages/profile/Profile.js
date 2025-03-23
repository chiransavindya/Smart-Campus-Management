import {
    Camera,
    Cancel,
    Edit,
    Email,
    LocationOn,
    Person,
    Phone,
    Save,
    School,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    role: user?.role || 'student',
    phone: '+1 (555) 123-4567',
    address: '123 Campus Drive, University City, State 12345',
    bio: 'Computer Science student with a passion for web development and artificial intelligence.',
    department: 'Computer Science',
    joinDate: 'September 2021',
    profilePicture: '/static/images/avatar/1.jpg',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = () => {
    // In a real app, this would be an API call to update the profile
    console.log('Saving profile:', profileData);
    
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
    
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        View and manage your personal information
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Avatar
                src={profileData.profilePicture}
                alt={profileData.name}
                sx={{ width: 120, height: 120, mx: 'auto' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: '50%',
                  transform: 'translateX(60px)',
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <Camera />
              </IconButton>
            </Box>
            <Typography variant="h5" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Member since {profileData.joinDate}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <School fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Department: {profileData.department}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {profileData.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {profileData.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {profileData.address}
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={editMode ? <Cancel /> : <Edit />}
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleEditToggle}
            >
              {editMode ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        {/* Edit Profile / Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                {editMode ? 'Edit Profile Information' : 'Profile Information'}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    name="department"
                    value={profileData.department}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" paragraph>
                  {profileData.bio}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Account Type
                        </Typography>
                        <Typography variant="body1">
                          {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Joined Date
                        </Typography>
                        <Typography variant="body1">
                          {profileData.joinDate}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Security Options
                </Typography>
                <Button variant="outlined" sx={{ mr: 2 }}>
                  Change Password
                </Button>
                <Button variant="outlined" color="error">
                  Two-Factor Authentication
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
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
    </Container>
  );
};

export default Profile; 