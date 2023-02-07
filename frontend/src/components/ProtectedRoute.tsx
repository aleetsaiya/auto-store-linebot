import React, { ReactNode, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  const haveUser = auth && auth.user;
  if (!haveUser) {
    return <Navigate to="/" />;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
