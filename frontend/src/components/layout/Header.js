import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentView } = useSelector((state) => state.ui);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Handle the sidebar toggle
  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Format the current view name for display
  const formatViewName = (view) => {
    if (!view) return 'Dashboard';
    return view.charAt(0).toUpperCase() + view.slice(1);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          CRM Demo - {formatViewName(currentView)}
        </Typography>
        
        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit"
              onClick={() => navigate('/accounts/new')}
            >
              New Account
            </Button>
            <Button 
              color="inherit"
              onClick={() => navigate('/contacts/new')}
            >
              New Contact
            </Button>
            <Button 
              color="inherit"
              onClick={() => navigate('/opportunities/new')}
            >
              New Opportunity
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
            <Chip
              avatar={<Avatar><PersonIcon /></Avatar>}
              label={user?.email || 'User'}
              color="primary"
              variant="outlined"
              sx={{ mx: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Button 
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 