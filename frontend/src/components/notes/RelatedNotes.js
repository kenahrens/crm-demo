import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { fetchNotesByRecordId, createNote, deleteNote } from '../../store/slices/noteSlice';

const RelatedNotes = ({ recordId, recordType, recordName }) => {
  const dispatch = useDispatch();
  const { relatedNotes, loading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (recordId && recordType) {
      dispatch(fetchNotesByRecordId({ recordId, recordType }));
    }
  }, [dispatch, recordId, recordType]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNoteContent('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeContent = (e) => {
    setNoteContent(e.target.value);
  };

  const handleCreateNote = () => {
    if (!noteContent.trim()) return;

    setIsSubmitting(true);
    const noteData = {
      content: noteContent,
      created_by: user.id,
      records: [
        {
          record_id: recordId,
          record_type: recordType
        }
      ]
    };

    dispatch(createNote(noteData)).then(() => {
      setIsSubmitting(false);
      setOpenDialog(false);
      // Refresh notes list
      dispatch(fetchNotesByRecordId({ recordId, recordType }));
    });
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(noteId)).then(() => {
        // Refresh notes list
        dispatch(fetchNotesByRecordId({ recordId, recordType }));
      });
    }
  };

  const getEntityTypeDisplay = () => {
    switch (recordType) {
      case 'account':
        return 'Account';
      case 'contact':
        return 'Contact';
      case 'opportunity':
        return 'Opportunity';
      default:
        return recordType;
    }
  };

  return (
    <Card>
      <CardHeader 
        title="Notes"
        action={
          <Button
            variant="contained" 
            size="small"
            startIcon={<NoteAddIcon />}
            onClick={handleOpenDialog}
          >
            Add Note
          </Button>
        }
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : !relatedNotes || relatedNotes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography color="text.secondary">
              No notes associated with this {getEntityTypeDisplay().toLowerCase()} yet.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<NoteAddIcon />}
              onClick={handleOpenDialog}
              sx={{ mt: 2 }}
            >
              Add the first note
            </Button>
          </Box>
        ) : (
          <List>
            {relatedNotes.map((note) => (
              <React.Fragment key={note.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{note.content.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ maxHeight: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Typography
                          component={Link}
                          to={`/notes/${note.id}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          {note.content.length > 100
                            ? `${note.content.substring(0, 100)}...`
                            : note.content}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {note.created_at 
                          ? `Added on ${format(new Date(note.created_at), 'MMM d, yyyy h:mm a')}` 
                          : 'Date unknown'}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      component={Link}
                      to={`/notes/${note.id}/edit`}
                      aria-label="edit"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteNote(note.id)}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>

      {/* Add Note Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Note to {recordName}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Adding note to {getEntityTypeDisplay()}: {recordName}
          </Typography>
          <TextField
            autoFocus
            label="Note Content"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={noteContent}
            onChange={handleChangeContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateNote} 
            variant="contained" 
            disabled={!noteContent.trim() || isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Save Note'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RelatedNotes; 