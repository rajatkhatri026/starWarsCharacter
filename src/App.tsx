import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/Authentication/LoginForm';
import MainContent from './pages/Dashboard/Character';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoutes from './ProtectedRoutes';
import useTokenRefresh from './hooks/useTokenRefresh';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { isAuthenticated } = useAuth();
  useTokenRefresh(); // Automatically refresh token when it is near expiration

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Route (Requires authentication) */}
        <Route
          path="/star-wars-characters"
          element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" />}
        >
          <Route path="/star-wars-characters" element={<MainContent />} />
        </Route>

        {/* Default Route*/}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/star-wars-characters" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;
