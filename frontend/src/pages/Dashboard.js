import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Grid, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fetchAccounts } from '../store/slices/accountSlice';
import { setCurrentView } from '../store/slices/uiSlice';

const SummaryCard = ({ title, count, icon, color, onClick }) => (
  <Card 
    sx={{ 
      minWidth: 200, 
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 3
      }
    }} 
    onClick={onClick}
  >
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box 
          sx={{ 
            bgcolor: `${color}.light`, 
            p: 1.5, 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" component="div">
            {count}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts, total: accountTotal } = useSelector((state) => state.accounts);
  
  // For demo purposes - would normally fetch all entity counts from a dedicated API
  const contactsCount = 0;
  const opportunitiesCount = 0;

  useEffect(() => {
    dispatch(setCurrentView('dashboard'));
    dispatch(fetchAccounts({ limit: 5 }));
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="Accounts" 
            count={accountTotal} 
            icon={<BusinessIcon sx={{ color: 'primary.main' }} />}
            color="primary"
            onClick={() => navigate('/accounts')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="Contacts" 
            count={contactsCount} 
            icon={<PeopleIcon sx={{ color: 'success.main' }} />}
            color="success"
            onClick={() => navigate('/contacts')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="Opportunities" 
            count={opportunitiesCount} 
            icon={<MonetizationOnIcon sx={{ color: 'warning.main' }} />}
            color="warning"
            onClick={() => navigate('/opportunities')}
          />
        </Grid>
      </Grid>
      
      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Recent Accounts
      </Typography>
      <Grid container spacing={2}>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  '&:hover': {
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate(`/accounts/${account.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {account.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {account.industry || 'No industry specified'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No accounts found. Create your first account to get started.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard; 