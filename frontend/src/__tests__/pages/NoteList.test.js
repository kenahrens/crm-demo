import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import NoteList from '../../pages/notes/NoteList';

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    notes: () => ({
      notes: [
        { 
          id: '1', 
          title: 'Test Note', 
          content: 'This is a test note',
          createdAt: '2023-05-01T10:00:00Z',
          relatedToType: 'Account',
          relatedToId: '1',
          relatedToName: 'Test Account'
        }
      ],
      loading: false,
      error: null
    })
  }
});

test('renders note list page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <NoteList />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for the heading specifically which should be unique
  const notesHeading = screen.getByRole('heading', { name: /notes/i });
  expect(notesHeading).toBeInTheDocument();
  
  // Also check for the new note button
  const newNoteButton = screen.getByText(/new note/i);
  expect(newNoteButton).toBeInTheDocument();
}); 