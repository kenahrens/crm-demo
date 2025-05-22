import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AccountDetail from '../../pages/accounts/AccountDetail';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    accounts: () => ({
      currentAccount: {
        id: '1',
        name: 'Test Account',
        industry: 'Technology',
        type: 'Customer',
        website: 'https://testaccount.com',
        phone: '555-123-4567',
        address: '123 Test St'
      },
      isLoading: false,
      error: null
    }),
    notes: () => ({
      relatedNotes: [],
      loading: false,
      error: null
    })
  }
});

test('renders account detail page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AccountDetail />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for account name or details
  const accountElement = screen.queryByText(/test account/i) || 
                        screen.queryByText(/account details/i);
  expect(accountElement).toBeInTheDocument();
}); 