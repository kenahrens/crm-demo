import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchOpportunity } from '../../store/slices/opportunitySlice';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'prospecting':
      return 'default';
    case 'qualification':
      return 'info';
    case 'proposal':
      return 'primary';
    case 'negotiation':
      return 'warning';
    case 'closed won':
      return 'success';
    case 'closed lost':
      return 'error';
    default:
      return 'default';
  }
};

const OpportunityDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOpportunity, loading, error } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!currentOpportunity) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>Opportunity not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">{currentOpportunity.name}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/opportunities/${id}/edit`}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Account</Typography>
              <Typography variant="body1">
                {currentOpportunity.account ? (
                  <Link to={`/accounts/${currentOpportunity.account.id}`}>
                    {currentOpportunity.account.name}
                  </Link>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Amount</Typography>
              <Typography variant="body1">
                {currentOpportunity.amount ? `$${currentOpportunity.amount.toLocaleString()}` : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Close Date</Typography>
              <Typography variant="body1">
                {currentOpportunity.closeDate ? new Date(currentOpportunity.closeDate).toLocaleDateString() : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="body1">
                <Chip 
                  label={currentOpportunity.status}
                  color={getStatusColor(currentOpportunity.status)}
                  size="small"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="body1">
                {currentOpportunity.description || 'No description provided.'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>Contacts</Typography>
      {/* Contact list would go here */}
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h5" sx={{ mb: 2 }}>Notes</Typography>
      {/* Notes would go here */}
    </Box>
  );
};

export default OpportunityDetail; 