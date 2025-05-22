import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchAccountById } from '../../store/slices/accountSlice';
import RelatedNotes from '../../components/notes/RelatedNotes';

const AccountDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAccount, loading, error } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccountById(id));
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

  if (!currentAccount) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>Account not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">{currentAccount.name}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/accounts/${id}/edit`}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Industry</Typography>
              <Typography variant="body1">{currentAccount.industry || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Website</Typography>
              <Typography variant="body1">
                {currentAccount.website ? (
                  <a href={currentAccount.website} target="_blank" rel="noopener noreferrer">
                    {currentAccount.website}
                  </a>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Phone</Typography>
              <Typography variant="body1">{currentAccount.phone || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Address</Typography>
              <Typography variant="body1">{currentAccount.address || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>Related Contacts</Typography>
          {/* Related contacts would go here */}
          <Card>
            <CardContent>
              <Typography color="text.secondary">No contacts associated with this account yet.</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>Opportunities</Typography>
          {/* Opportunities would go here */}
          <Card>
            <CardContent>
              <Typography color="text.secondary">No opportunities associated with this account yet.</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>Notes</Typography>
          <RelatedNotes 
            recordId={id} 
            recordType="account" 
            recordName={currentAccount.name} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountDetail; 