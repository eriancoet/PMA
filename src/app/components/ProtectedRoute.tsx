import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
