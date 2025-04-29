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
  MenuItem
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchNote, createNote, updateNote, clearCurrentNote } from '../../store/slices/noteSlice';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentNote, loading, error } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    relatedTo: '',
    relatedId: ''
  });

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
      setFormData({
        title: currentNote.title || '',
        content: currentNote.content || '',
        category: currentNote.category || '',
        relatedTo: currentNote.contact ? 'contact' : 
                   currentNote.account ? 'account' :
                   currentNote.opportunity ? 'opportunity' : '',
        relatedId: currentNote.contact ? currentNote.contactId : 
                   currentNote.account ? currentNote.accountId :
                   currentNote.opportunity ? currentNote.opportunityId : ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transform formData to API structure
    const noteData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      created_by: user.id
    };

    // Add related entity if selected
    if (formData.relatedTo && formData.relatedId) {
      if (formData.relatedTo === 'contact') {
        noteData.contactId = formData.relatedId;
      } else if (formData.relatedTo === 'account') {
        noteData.accountId = formData.relatedId;
      } else if (formData.relatedTo === 'opportunity') {
        noteData.opportunityId = formData.relatedId;
      }
    }

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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Call">Call</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Task">Task</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Related To</InputLabel>
                <Select
                  name="relatedTo"
                  value={formData.relatedTo}
                  onChange={handleChange}
                  label="Related To"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="contact">Contact</MenuItem>
                  <MenuItem value="account">Account</MenuItem>
                  <MenuItem value="opportunity">Opportunity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {formData.relatedTo && (
              <Grid item xs={12}>
                {/* In a real app, you would dynamically load entities based on relatedTo */}
                <TextField
                  label="Related ID"
                  name="relatedId"
                  value={formData.relatedId}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  helperText="In a real app, this would be a dropdown with entities"
                />
              </Grid>
            )}
            
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