import React from 'react';
import { Routes as Rts, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import backend from '../services/backend';

function PrivateRoute({ children }) {
  const user = backend.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  return children;
}

function Routes() {
  return (
    <Rts>
      <Route 
        path="/login" 
        element={<Login />} 
      />
      <Route 
        path="/signup" 
        element={<SignUp />}
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" />} 
      />
    </Rts>
  );
}

export default Routes;