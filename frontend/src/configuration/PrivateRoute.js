import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = localStorage.getItem('jwt');

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
