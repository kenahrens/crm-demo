import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchOpportunities } from '../../store/slices/opportunitySlice';

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

const OpportunityList = () => {
  const dispatch = useDispatch();
  const { opportunities, loading, error } = useSelector((state) => state.opportunities);

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, [dispatch]);

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Opportunities</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/opportunities/new"
          startIcon={<AddIcon />}
        >
          New Opportunity
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Close Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow key={opportunity.id} hover component={Link} to={`/opportunities/${opportunity.id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                <TableCell>{opportunity.name}</TableCell>
                <TableCell>{opportunity.account?.name || 'N/A'}</TableCell>
                <TableCell>
                  {opportunity.amount ? `$${opportunity.amount.toLocaleString()}` : 'N/A'}
                </TableCell>
                <TableCell>
                  {opportunity.closeDate ? new Date(opportunity.closeDate).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={opportunity.status}
                    color={getStatusColor(opportunity.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {opportunities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No opportunities found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OpportunityList; 