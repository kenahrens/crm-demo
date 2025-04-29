import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { createAccount, fetchAccountById, updateAccount } from '../../store/slices/accountSlice';
import Notification from '../../components/Notification';

const AccountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAccount, loading } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const isEditMode = Boolean(id);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAccountById(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && currentAccount) {
      setFormData({
        name: currentAccount.name || '',
        industry: currentAccount.industry || '',
        website: currentAccount.website || '',
        phone: currentAccount.phone || '',
        address: currentAccount.address || '',
      });
    }
  }, [currentAccount, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const apiFormData = {
      ...formData,
      created_by: user.id
    };
    
    if (isEditMode) {
      apiFormData.updated_by = user.id;

      dispatch(updateAccount({ id, ...apiFormData }))
        .unwrap()
        .then(() => {
          navigate(`/accounts/${id}`);
        })
        .catch(error => {
          console.error("Error updating account:", error);
          setNotification({
            open: true,
            message: "Error updating account: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    } else {
      dispatch(createAccount(apiFormData))
        .unwrap()
        .then((newAccount) => {
          navigate(`/accounts/${newAccount.id}`);
        })
        .catch(error => {
          console.error("Error creating account:", error);
          setNotification({
            open: true,
            message: "Error creating account: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/accounts/${id}`);
    } else {
      navigate('/accounts');
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
        {isEditMode ? 'Edit Account' : 'New Account'}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Account Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
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
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
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

export default AccountForm; 