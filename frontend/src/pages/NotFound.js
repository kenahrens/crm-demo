import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 140px)',
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>404</Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>Page Not Found</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound; 