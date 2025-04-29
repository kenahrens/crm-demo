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
import { fetchNotes } from '../../store/slices/noteSlice';
import { format } from 'date-fns';

const NoteList = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
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
        <Typography variant="h4">Notes</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/notes/new"
          startIcon={<AddIcon />}
        >
          New Note
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Related To</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes && notes.length > 0 ? (
              notes.map((note) => (
                <TableRow key={note.id} hover component={Link} to={`/notes/${note.id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>
                    {note.contact ? `Contact: ${note.contact.firstName} ${note.contact.lastName}` : 
                     note.account ? `Account: ${note.account.name}` : 
                     note.opportunity ? `Opportunity: ${note.opportunity.name}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {note.createdAt ? format(new Date(note.createdAt), 'MMM d, yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell>
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
                    ) : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No notes found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NoteList; 