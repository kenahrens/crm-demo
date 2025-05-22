import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fetchNote, deleteNote } from '../../store/slices/noteSlice';
import { fetchAccounts } from '../../store/slices/accountSlice';
import { fetchContacts } from '../../store/slices/contactSlice';
import { fetchOpportunities } from '../../store/slices/opportunitySlice';
import { format } from 'date-fns';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentNote: note, loading, error } = useSelector((state) => state.notes);
  const { accounts } = useSelector((state) => state.accounts);
  const { contacts } = useSelector((state) => state.contacts);
  const { opportunities } = useSelector((state) => state.opportunities);

  useEffect(() => {
    if (id) {
      dispatch(fetchNote(id));
      dispatch(fetchAccounts());
      dispatch(fetchContacts());
      dispatch(fetchOpportunities());
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id)).then(() => {
        navigate('/notes');
      });
    }
  };

  // Helper functions to get associated records details
  const getAccountsForNote = () => {
    if (!note || !note.records || !accounts.length) return [];
    return note.records
      .filter(record => record.record_type === 'account')
      .map(record => {
        const account = accounts.find(a => a.id === record.record_id);
        return account || { id: record.record_id, name: 'Unknown Account' };
      });
  };

  const getContactsForNote = () => {
    if (!note || !note.records || !contacts.length) return [];
    return note.records
      .filter(record => record.record_type === 'contact')
      .map(record => {
        const contact = contacts.find(c => c.id === record.record_id);
        return contact || { 
          id: record.record_id, 
          first_name: 'Unknown', 
          last_name: 'Contact' 
        };
      });
  };

  const getOpportunitiesForNote = () => {
    if (!note || !note.records || !opportunities.length) return [];
    return note.records
      .filter(record => record.record_type === 'opportunity')
      .map(record => {
        const opportunity = opportunities.find(o => o.id === record.record_id);
        return opportunity || { 
          id: record.record_id, 
          opportunity_name: 'Unknown Opportunity' 
        };
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

  if (!note) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography>Note not found</Typography>
      </Box>
    );
  }

  const associatedAccounts = getAccountsForNote();
  const associatedContacts = getContactsForNote();
  const associatedOpportunities = getOpportunitiesForNote();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Note Details</Typography>
        <Box>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to={`/notes/${id}/edit`}
            startIcon={<EditIcon />}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Note Content" />
            <Divider />
            <CardContent>
              <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                {note.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Note Information" />
            <Divider />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Created By</Typography>
                <Typography>
                  {note.created_by ? note.created_by : 'System'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Created On</Typography>
                <Typography>
                  {note.created_at ? format(new Date(note.created_at), 'MMM d, yyyy h:mm a') : 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Last Updated</Typography>
                <Typography>
                  {note.updated_at ? format(new Date(note.updated_at), 'MMM d, yyyy h:mm a') : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader title="Associated Records" />
            <Divider />
            <CardContent>
              {associatedAccounts.length === 0 && 
               associatedContacts.length === 0 && 
               associatedOpportunities.length === 0 ? (
                <Typography color="text.secondary">No associated records</Typography>
              ) : (
                <>
                  {associatedAccounts.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Accounts</Typography>
                      <List dense disablePadding>
                        {associatedAccounts.map(account => (
                          <ListItem 
                            key={account.id}
                            component={Link}
                            to={`/accounts/${account.id}`}
                            sx={{ 
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' },
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                              <BusinessIcon />
                            </Avatar>
                            <ListItemText primary={account.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  {associatedContacts.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Contacts</Typography>
                      <List dense disablePadding>
                        {associatedContacts.map(contact => (
                          <ListItem 
                            key={contact.id}
                            component={Link}
                            to={`/contacts/${contact.id}`}
                            sx={{ 
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' },
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <Avatar sx={{ mr: 1, bgcolor: 'secondary.main' }}>
                              <PersonIcon />
                            </Avatar>
                            <ListItemText primary={`${contact.first_name} ${contact.last_name}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  {associatedOpportunities.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Opportunities</Typography>
                      <List dense disablePadding>
                        {associatedOpportunities.map(opportunity => (
                          <ListItem 
                            key={opportunity.id}
                            component={Link}
                            to={`/opportunities/${opportunity.id}`}
                            sx={{ 
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' },
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <Avatar sx={{ mr: 1, bgcolor: 'success.main' }}>
                              <MonetizationOnIcon />
                            </Avatar>
                            <ListItemText primary={opportunity.opportunity_name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteDetail; 