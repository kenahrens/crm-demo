import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchContact } from '../../store/slices/contactSlice';

const ContactDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentContact, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContact(id));
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

  if (!currentContact) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>Contact not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">{`${currentContact.first_name || currentContact.firstName} ${currentContact.last_name || currentContact.lastName}`}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/contacts/${id}/edit`}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="body1">
                {currentContact.email ? (
                  <a href={`mailto:${currentContact.email}`}>
                    {currentContact.email}
                  </a>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Phone</Typography>
              <Typography variant="body1">
                {currentContact.phone ? (
                  <a href={`tel:${currentContact.phone}`}>
                    {currentContact.phone}
                  </a>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Account</Typography>
              <Typography variant="body1">
                {currentContact.account ? (
                  <Link to={`/accounts/${currentContact.account.id}`}>
                    {currentContact.account.name}
                  </Link>
                ) : currentContact.account_id ? (
                  <Link to={`/accounts/${currentContact.account_id}`}>
                    Account ID: {currentContact.account_id}
                  </Link>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Title</Typography>
              <Typography variant="body1">{currentContact.title || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>Opportunities</Typography>
      {/* Opportunities would go here */}
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h5" sx={{ mb: 2 }}>Notes</Typography>
      {/* Notes would go here */}
    </Box>
  );
};

export default ContactDetail; 