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
  const user = backend.getCurrentUser();
  return !user ? children : <Navigate to="/dashboard" />;
}

function Routes() {
  return (
    <Rts>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
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