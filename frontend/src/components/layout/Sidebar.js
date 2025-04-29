import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NoteIcon from '@mui/icons-material/Note';
import { setCurrentView } from '../../store/slices/uiSlice';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Accounts', icon: <BusinessIcon />, path: '/accounts' },
  { text: 'Contacts', icon: <PeopleIcon />, path: '/contacts' },
  { text: 'Opportunities', icon: <MonetizationOnIcon />, path: '/opportunities' },
  { text: 'Notes', icon: <NoteIcon />, path: '/notes' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const handleNavigate = (path, viewName) => {
    navigate(path);
    dispatch(setCurrentView(viewName.toLowerCase()));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? drawerWidth : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : 64,
          boxSizing: 'border-box',
          marginTop: '64px',
          height: 'calc(100% - 64px)',
          transition: 'width 0.2s',
          overflowX: 'hidden'
        },
        transition: 'width 0.2s'
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path, item.text)}
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: sidebarOpen ? 1 : 0,
                  display: sidebarOpen ? 'block' : 'none'
                }} 
              />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar; 