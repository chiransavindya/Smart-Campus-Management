import {
    Assessment,
    Book,
    Business,
    CalendarMonth,
    ChevronLeft,
    Dashboard,
    Event,
    Group,
    HowToReg,
    Logout,
    Menu as MenuIcon,
    Notifications,
    Person,
    Security,
    Settings
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Drawer width
const drawerWidth = 240;

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
    handleCloseUserMenu();
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      {
        text: 'Events',
        path: '/events',
        icon: <Event />
      },
      {
        text: 'Reservations',
        path: '/reservations',
        icon: <CalendarMonth />
      }
    ];

    // Role-specific items
    const roleItems = {
      admin: [
        {
          text: 'Admin Overview',
          path: '/admin/overview',
          icon: <Dashboard />
        },
        {
          text: 'User Management',
          path: '/admin/users',
          icon: <Group />
        },
        {
          text: 'Resource Management',
          path: '/admin/resources',
          icon: <Business />
        },
        {
          text: 'Event Management',
          path: '/admin/events',
          icon: <Event />
        },
        {
          text: 'Security & Compliance',
          path: '/admin/security',
          icon: <Security />
        },
        {
          text: 'System Settings',
          path: '/admin/settings',
          icon: <Settings />
        }
      ],
      lecturer: [
        {
          text: 'Lecturer Dashboard',
          path: '/lecturer',
          icon: <Dashboard />
        },
        {
          text: 'Course Management',
          path: '/lecturer/courses',
          icon: <Book />
        },
        {
          text: 'Attendance Tracker',
          path: '/lecturer/attendance',
          icon: <HowToReg />
        }
      ],
      student: [
        {
          text: 'Student Dashboard',
          path: '/student',
          icon: <Dashboard />
        },
        {
          text: 'Class Registration',
          path: '/student/registration',
          icon: <Assessment />
        },
        {
          text: 'Grades',
          path: '/student/grades',
          icon: <Book />
        }
      ]
    };

    return user && user.role ? [...roleItems[user.role], ...commonItems] : commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SMART CAMPUS
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SMART CAMPUS
            </Typography>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
            </Tooltip>
            
            {/* User Menu */}
            <Box sx={{ ml: 2 }}>
              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    alt={user?.name || 'User'} 
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={handleCloseDrawer}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Add toolbar for spacing */}
      <Toolbar />
    </>
  );
};

export default Navigation; 