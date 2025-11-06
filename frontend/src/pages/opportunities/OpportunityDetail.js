import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchOpportunity, deleteOpportunity } from '../../store/slices/opportunitySlice';

const getStatusColor = (status) => {
  if (!status) return 'default';
  const normalized = String(status).toLowerCase().trim();
  switch (normalized) {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOpportunity, loading, error } = useSelector((state) => state.opportunities);
  const { accounts } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(fetchOpportunity(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (!id) return;
    const confirm = window.confirm('Are you sure you want to delete this opportunity?');
    if (!confirm) return;
    dispatch(deleteOpportunity(id))
      .unwrap()
      .then(() => {
        navigate('/opportunities');
      })
      .catch((e) => {
        console.error('Failed to delete opportunity', e);
      });
  };

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
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            sx={{ mr: 1 }}
          >
            Delete
          </Button>
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
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Account</Typography>
              <Typography variant="body1">
                {(() => {
                  const id = currentOpportunity.account?.id || currentOpportunity.accountId || currentOpportunity.account_id;
                  const account = accounts.find(a => a.id === id);
                  return account ? (
                    <Link to={`/accounts/${account.id}`}>
                      {account.name}
                    </Link>
                  ) : 'N/A';
                })()}
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
                {currentOpportunity.closeDate 
                  ? new Date(currentOpportunity.closeDate).toLocaleDateString(undefined, { timeZone: 'UTC' }) 
                  : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Status</Typography>
              <Box>
                <Chip 
                  label={currentOpportunity.status}
                  color={getStatusColor(currentOpportunity.status)}
                  size="small"
                />
              </Box>
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