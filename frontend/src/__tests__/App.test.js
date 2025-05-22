import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';

// Mock all the components used in routes to simplify testing
jest.mock('../components/layout/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/layout/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../components/common/NotificationCenter', () => () => <div data-testid="notification">Notifications</div>);
jest.mock('../pages/Dashboard', () => () => <div data-testid="dashboard">Dashboard</div>);
jest.mock('../pages/Login', () => () => <div data-testid="login">Login</div>);

// Create mock store for authenticated and unauthenticated states
const createMockStore = (isAuthenticated) => configureStore({
  reducer: {
    auth: () => ({
      isAuthenticated,
      user: isAuthenticated ? { name: 'Test User' } : null,
      isLoading: false,
      error: null
    }),
    ui: () => ({ sidebarOpen: true })
  }
});

test('renders login page when not authenticated', () => {
  render(
    <Provider store={createMockStore(false)}>
      <App />
    </Provider>
  );
  
  expect(screen.getByTestId('login')).toBeInTheDocument();
});

test('renders dashboard page when authenticated', () => {
  render(
    <Provider store={createMockStore(true)}>
      <App />
    </Provider>
  );
  
  expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  expect(screen.getByTestId('notification')).toBeInTheDocument();
}); 