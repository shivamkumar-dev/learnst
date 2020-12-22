import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

const ProtectedRoute = ({ path, component: Component }) => {
  return getCurrentUser() ? (
    <Route path={path}>{Component}</Route>
  ) : (
    <Redirect to='/login' />
  );
};

export default ProtectedRoute;
