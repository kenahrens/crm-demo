import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../../pages/Login';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: () => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    })
  }
});

test('renders login page', () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  
  // Check for login form elements using more specific queries
  const headingElement = screen.getByRole('heading', { name: /sign in/i });
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  
  expect(headingElement).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
}); 