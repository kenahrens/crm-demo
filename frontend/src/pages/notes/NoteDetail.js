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
  Chip,
  Grid,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchNote, deleteNote } from '../../store/slices/noteSlice';
import { format } from 'date-fns';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentNote: note, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    if (id) {
      dispatch(fetchNote(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id)).then(() => {
        navigate('/notes');
      });
    }
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">{note.title}</Typography>
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
      
      <Paper sx={{ mb: 4 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Category</Typography>
              {note.category ? (
                <Chip 
                  label={note.category} 
                  color={
                    note.category === 'Meeting' ? 'primary' :
                    note.category === 'Call' ? 'secondary' :
                    note.category === 'Email' ? 'success' : 'default'
                  } 
                  size="small" 
                />
              ) : (
                <Typography>N/A</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Related To</Typography>
              <Typography>
                {note.contact ? `Contact: ${note.contact.firstName} ${note.contact.lastName}` : 
                 note.account ? `Account: ${note.account.name}` : 
                 note.opportunity ? `Opportunity: ${note.opportunity.name}` : 'N/A'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Created</Typography>
              <Typography>
                {note.createdAt ? format(new Date(note.createdAt), 'MMM d, yyyy h:mm a') : 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Card>
        <CardHeader title="Note Content" />
        <Divider />
        <CardContent>
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
            {note.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoteDetail; 