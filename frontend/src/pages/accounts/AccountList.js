import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchAccounts } from '../../store/slices/accountSlice';

const AccountList = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.accounts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleRowClick = (accountId) => {
    navigate(`/accounts/${accountId}`);
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Accounts</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/accounts/new"
          startIcon={<AddIcon />}
        >
          New Account
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow 
                key={account.id} 
                hover 
                onClick={() => handleRowClick(account.id)} 
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.industry}</TableCell>
                <TableCell>{account.website}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>{account.address}</TableCell>
              </TableRow>
            ))}
            {accounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No accounts found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccountList; 