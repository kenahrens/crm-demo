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
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createOpportunity, fetchOpportunity, updateOpportunity } from '../../store/slices/opportunitySlice';
import { fetchAccounts } from '../../store/slices/accountSlice';
import Notification from '../../components/Notification';

const statusOptions = [
  'Prospecting',
  'Qualification',
  'Proposal',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

const OpportunityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOpportunity, loading } = useSelector((state) => state.opportunities);
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    accountId: '',
    amount: '',
    closeDate: null,
    status: 'Prospecting',
    description: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    dispatch(fetchAccounts());
    
    if (isEditMode) {
      dispatch(fetchOpportunity(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && currentOpportunity) {
      setFormData({
        name: currentOpportunity.name || '',
        accountId: currentOpportunity.account?.id || '',
        amount: currentOpportunity.amount || '',
        closeDate: currentOpportunity.closeDate ? new Date(currentOpportunity.closeDate) : null,
        status: currentOpportunity.status || 'Prospecting',
        description: currentOpportunity.description || '',
      });
    }
  }, [currentOpportunity, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      closeDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      amount: formData.amount ? parseFloat(formData.amount) : null,
      created_by: user.id
    };
    
    if (isEditMode) {
      submissionData.updated_by = user.id;
      
      dispatch(updateOpportunity({ id, ...submissionData }))
        .unwrap()
        .then(() => {
          navigate(`/opportunities/${id}`);
        })
        .catch(error => {
          console.error("Error updating opportunity:", error);
          setNotification({
            open: true,
            message: "Error updating opportunity: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    } else {
      dispatch(createOpportunity(submissionData))
        .unwrap()
        .then((newOpportunity) => {
          navigate(`/opportunities/${newOpportunity.id}`);
        })
        .catch(error => {
          console.error("Error creating opportunity:", error);
          setNotification({
            open: true,
            message: "Error creating opportunity: " + (error.message || "Unknown error"),
            severity: 'error'
          });
        });
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/opportunities/${id}`);
    } else {
      navigate('/opportunities');
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
        {isEditMode ? 'Edit Opportunity' : 'New Opportunity'}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Opportunity Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Account</InputLabel>
                  <Select
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    label="Account"
                  >
                    {accounts.map((account) => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Close Date"
                    value={formData.closeDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
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

export default OpportunityForm; 