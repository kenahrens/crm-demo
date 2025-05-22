import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ContactList from '../../pages/contacts/ContactList';

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    contacts: () => ({
      contacts: [
        { 
          id: '1', 
          firstName: 'John', 
          lastName: 'Doe', 
          email: 'john@example.com',
          phone: '555-123-4567',
          accountId: '1',
          accountName: 'Test Account'
        }
      ],
      loading: false,
      error: null
    })
  }
});

test('renders contact list page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ContactList />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for contacts heading or add button
  const contactsElement = screen.queryByText(/contacts/i) || 
                          screen.queryByText(/add contact/i) ||
                          screen.queryByText(/new contact/i);
  expect(contactsElement).toBeInTheDocument();
}); 