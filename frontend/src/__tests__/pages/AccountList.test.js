import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AccountList from '../../pages/accounts/AccountList';

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User' } }),
    ui: () => ({ sidebarOpen: true }),
    accounts: () => ({
      accounts: [
        { id: '1', name: 'Test Account', industry: 'Technology', type: 'Customer' }
      ],
      loading: false,
      error: null
    })
  }
});

test('renders account list page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AccountList />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for accounts heading or add button
  const accountsElement = screen.queryByText(/accounts/i) || 
                          screen.queryByText(/add account/i) ||
                          screen.queryByText(/new account/i);
  expect(accountsElement).toBeInTheDocument();
}); 