import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import NotificationCenter from './components/common/NotificationCenter';
import PrivateRoute from './components/auth/PrivateRoute';

// Page components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccountList from './pages/accounts/AccountList';
import AccountDetail from './pages/accounts/AccountDetail';
import AccountForm from './pages/accounts/AccountForm';
import ContactList from './pages/contacts/ContactList';
import ContactDetail from './pages/contacts/ContactDetail';
import ContactForm from './pages/contacts/ContactForm';
import OpportunityList from './pages/opportunities/OpportunityList';
import OpportunityDetail from './pages/opportunities/OpportunityDetail';
import OpportunityForm from './pages/opportunities/OpportunityForm';
import NoteList from './pages/notes/NoteList';
import NoteDetail from './pages/notes/NoteDetail';
import NoteForm from './pages/notes/NoteForm';
import NotFound from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', height: '100vh' }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${sidebarOpen ? 240 : 64}px)` },
                marginLeft: { sm: sidebarOpen ? '240px' : '64px' },
                marginTop: '64px',
                transition: 'margin-left 0.2s',
                overflow: 'auto'
              }}
            >
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                
                {/* Accounts */}
                <Route path="/accounts" element={
                  <PrivateRoute>
                    <AccountList />
                  </PrivateRoute>
                } />
                <Route path="/accounts/:id" element={
                  <PrivateRoute>
                    <AccountDetail />
                  </PrivateRoute>
                } />
                <Route path="/accounts/new" element={
                  <PrivateRoute>
                    <AccountForm />
                  </PrivateRoute>
                } />
                <Route path="/accounts/:id/edit" element={
                  <PrivateRoute>
                    <AccountForm />
                  </PrivateRoute>
                } />
                
                {/* Contacts */}
                <Route path="/contacts" element={
                  <PrivateRoute>
                    <ContactList />
                  </PrivateRoute>
                } />
                <Route path="/contacts/:id" element={
                  <PrivateRoute>
                    <ContactDetail />
                  </PrivateRoute>
                } />
                <Route path="/contacts/new" element={
                  <PrivateRoute>
                    <ContactForm />
                  </PrivateRoute>
                } />
                <Route path="/contacts/:id/edit" element={
                  <PrivateRoute>
                    <ContactForm />
                  </PrivateRoute>
                } />
                
                {/* Opportunities */}
                <Route path="/opportunities" element={
                  <PrivateRoute>
                    <OpportunityList />
                  </PrivateRoute>
                } />
                <Route path="/opportunities/:id" element={
                  <PrivateRoute>
                    <OpportunityDetail />
                  </PrivateRoute>
                } />
                <Route path="/opportunities/new" element={
                  <PrivateRoute>
                    <OpportunityForm />
                  </PrivateRoute>
                } />
                <Route path="/opportunities/:id/edit" element={
                  <PrivateRoute>
                    <OpportunityForm />
                  </PrivateRoute>
                } />
                
                {/* Notes */}
                <Route path="/notes" element={
                  <PrivateRoute>
                    <NoteList />
                  </PrivateRoute>
                } />
                <Route path="/notes/:id" element={
                  <PrivateRoute>
                    <NoteDetail />
                  </PrivateRoute>
                } />
                <Route path="/notes/new" element={
                  <PrivateRoute>
                    <NoteForm />
                  </PrivateRoute>
                } />
                <Route path="/notes/:id/edit" element={
                  <PrivateRoute>
                    <NoteForm />
                  </PrivateRoute>
                } />
                
                {/* Auth */}
                <Route path="/login" element={<Navigate to="/" />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <NotificationCenter />
          </Box>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App; 