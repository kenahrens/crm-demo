import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  ListItemText,
  Checkbox
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchNote, createNote, updateNote, clearCurrentNote } from '../../store/slices/noteSlice';
import { fetchAccounts } from '../../store/slices/accountSlice';
import { fetchContacts } from '../../store/slices/contactSlice';
import { fetchOpportunities } from '../../store/slices/opportunitySlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentNote, loading, error } = useSelector((state) => state.notes);
  const { accounts } = useSelector((state) => state.accounts);
  const { contacts } = useSelector((state) => state.contacts);
  const { opportunities } = useSelector((state) => state.opportunities);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    content: '',
    associations: []
  });

  // Fetch related entities for selection
  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchContacts());
    dispatch(fetchOpportunities());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchNote(id));
    } else {
      dispatch(clearCurrentNote());
    }
    
    return () => {
      dispatch(clearCurrentNote());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentNote && id) {
      // Extract associations from note
      const associations = [];
      if (currentNote.records && currentNote.records.length > 0) {
        currentNote.records.forEach(record => {
          associations.push({
            id: record.record_id,
            type: record.record_type
          });
        });
      }

      setFormData({
        content: currentNote.content || '',
        associations: associations
      });
    }
  }, [currentNote, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAccountSelect = (event) => {
    const { value } = event.target;
    
    // Convert selected account IDs to association objects
    const accountAssociations = value.map(accountId => ({
      id: accountId,
      type: 'account'
    }));
    
    // Filter out any existing account associations
    const otherAssociations = formData.associations.filter(
      assoc => assoc.type !== 'account'
    );
    
    setFormData({
      ...formData,
      associations: [...otherAssociations, ...accountAssociations]
    });
  };

  const handleContactSelect = (event) => {
    const { value } = event.target;
    
    // Convert selected contact IDs to association objects
    const contactAssociations = value.map(contactId => ({
      id: contactId,
      type: 'contact'
    }));
    
    // Filter out any existing contact associations
    const otherAssociations = formData.associations.filter(
      assoc => assoc.type !== 'contact'
    );
    
    setFormData({
      ...formData,
      associations: [...otherAssociations, ...contactAssociations]
    });
  };

  const handleOpportunitySelect = (event) => {
    const { value } = event.target;
    
    // Convert selected opportunity IDs to association objects
    const opportunityAssociations = value.map(opportunityId => ({
      id: opportunityId,
      type: 'opportunity'
    }));
    
    // Filter out any existing opportunity associations
    const otherAssociations = formData.associations.filter(
      assoc => assoc.type !== 'opportunity'
    );
    
    setFormData({
      ...formData,
      associations: [...otherAssociations, ...opportunityAssociations]
    });
  };

  const getSelectedAccountIds = () => {
    return formData.associations
      .filter(assoc => assoc.type === 'account')
      .map(assoc => assoc.id);
  };

  const getSelectedContactIds = () => {
    return formData.associations
      .filter(assoc => assoc.type === 'contact')
      .map(assoc => assoc.id);
  };

  const getSelectedOpportunityIds = () => {
    return formData.associations
      .filter(assoc => assoc.type === 'opportunity')
      .map(assoc => assoc.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform formData to API structure
    const noteData = {
      content: formData.content,
      created_by: user.id,
      records: formData.associations.map(assoc => ({
        record_id: assoc.id,
        record_type: assoc.type
      }))
    };

    if (id) {
      noteData.updated_by = user.id;
      
      dispatch(updateNote({ id, ...noteData })).then((result) => {
        if (!result.error) {
          navigate(`/notes/${id}`);
        }
      });
    } else {
      dispatch(createNote(noteData)).then((result) => {
        if (!result.error) {
          navigate('/notes');
        }
      });
    }
  };

  if (loading && id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {id ? 'Edit Note' : 'New Note'}
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}
      
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                multiline
                rows={6}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="accounts-select-label">Related Accounts</InputLabel>
                <Select
                  labelId="accounts-select-label"
                  id="accounts-select"
                  multiple
                  value={getSelectedAccountIds()}
                  onChange={handleAccountSelect}
                  input={<OutlinedInput label="Related Accounts" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const account = accounts.find(acc => acc.id === value);
                        return (
                          <Chip key={value} label={account ? account.name : value} />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      <Checkbox checked={getSelectedAccountIds().indexOf(account.id) > -1} />
                      <ListItemText primary={account.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="contacts-select-label">Related Contacts</InputLabel>
                <Select
                  labelId="contacts-select-label"
                  id="contacts-select"
                  multiple
                  value={getSelectedContactIds()}
                  onChange={handleContactSelect}
                  input={<OutlinedInput label="Related Contacts" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const contact = contacts.find(c => c.id === value);
                        return (
                          <Chip key={value} label={contact ? `${contact.first_name} ${contact.last_name}` : value} />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {contacts.map((contact) => (
                    <MenuItem key={contact.id} value={contact.id}>
                      <Checkbox checked={getSelectedContactIds().indexOf(contact.id) > -1} />
                      <ListItemText primary={`${contact.first_name} ${contact.last_name}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="opportunities-select-label">Related Opportunities</InputLabel>
                <Select
                  labelId="opportunities-select-label"
                  id="opportunities-select"
                  multiple
                  value={getSelectedOpportunityIds()}
                  onChange={handleOpportunitySelect}
                  input={<OutlinedInput label="Related Opportunities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const opportunity = opportunities.find(opp => opp.id === value);
                        return (
                          <Chip key={value} label={opportunity ? opportunity.opportunity_name : value} />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {opportunities.map((opportunity) => (
                    <MenuItem key={opportunity.id} value={opportunity.id}>
                      <Checkbox checked={getSelectedOpportunityIds().indexOf(opportunity.id) > -1} />
                      <ListItemText primary={opportunity.opportunity_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/notes')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NoteForm; 