import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AccountForm from '../../pages/accounts/AccountForm';

// Mock the useParams and useNavigate hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({}), // Empty for new account form
  useNavigate: () => jest.fn()
}));

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({ user: { name: 'Test User', id: '1' } }),
    ui: () => ({ sidebarOpen: true }),
    accounts: () => ({
      currentAccount: null,
      loading: false,
      error: null
    })
  }
});

test('renders account form page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AccountForm />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for form elements
  const formElement = screen.queryByText(/new account/i) || 
                     screen.queryByText(/account information/i) ||
                     screen.queryByLabelText(/account name/i);
  expect(formElement).toBeInTheDocument();
}); 