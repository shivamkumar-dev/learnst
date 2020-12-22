import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAdmin } from '../../services/authService';

const AdminProtectedRoute = ({ path, component: Component }) => {
  return getAdmin() ? (
    <Route path={path}>{Component}</Route>
  ) : (
    <Redirect to='/not-found' />
  );
};

export default AdminProtectedRoute;
