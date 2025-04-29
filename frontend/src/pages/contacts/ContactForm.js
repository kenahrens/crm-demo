import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { createContact, fetchContact, updateContact } from '../../store/slices/contactSlice';
import { fetchAccounts } from '../../store/slices/accountSlice';
import Notification from '../../components/Notification';

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentContact, loading } = useSelector((state) => state.contacts);
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    accountId: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    dispatch(fetchAccounts());
    
    if (isEditMode) {
      dispatch(fetchContact(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && currentContact) {
      setFormData({
        firstName: currentContact.first_name || currentContact.firstName || '',
        lastName: currentContact.last_name || currentContact.lastName || '',
        email: currentContact.email || '',
        phone: currentContact.phone || '',
        title: currentContact.title || '',
        accountId: currentContact.account_id || currentContact.accountId || '',
      });
    }
  }, [currentContact, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make sure we extract the user ID correctly regardless of user object structure
    const userId = user?.id || user?.user?.id || user?.userId;
    
    if (!userId) {
      setNotification({
        open: true,
        message: "Cannot create contact: User ID not available",
        severity: 'error'
      });
      return;
    }
    
    const apiFormData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      account_id: formData.accountId,
      created_by: userId
    };
    
    if (isEditMode) {
      apiFormData.updated_by = userId;

      dispatch(updateContact({ id, ...apiFormData }))
        .unwrap()
        .then(() => {
          navigate(`/contacts/${id}`);
        })
        .catch(error => {
          console.error("Error updating contact:", error);
          setNotification({
            open: true,
            message: "Error updating contact: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    } else {
      dispatch(createContact(apiFormData))
        .unwrap()
        .then((newContact) => {
          navigate(`/contacts/${newContact.id}`);
        })
        .catch(error => {
          console.error("Error creating contact:", error);
          setNotification({
            open: true,
            message: "Error creating contact: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/contacts/${id}`);
    } else {
      navigate('/contacts');
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading && isEditMode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
      <Typography variant="h4" sx={{ mb: 3 }}>
        {isEditMode ? 'Edit Contact' : 'New Contact'}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Account</InputLabel>
                  <Select
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    label="Account"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {accounts.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactForm; 