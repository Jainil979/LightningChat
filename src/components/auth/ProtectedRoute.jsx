// src/components/auth/ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { verifyToken } from '../../services/authService';
import { refreshAccessToken } from '../../utils/authFetch';

const ProtectedRoute = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setChecking(false);
      setAllow(false);
      return;
    }

    let cancelled = false;

    const runVerification = async () => {
      // 1. Fast check – no DB
      let valid = await verifyToken();
      if (valid) {
        if (!cancelled) {
          setAllow(true);
          setChecking(false);
        }
        return;
      }

      // 2. Token invalid/expired – try refresh
      try {
        await refreshAccessToken();        // succeeds or throws
        valid = await verifyToken();
        if (valid) {
          if (!cancelled) {
            setAllow(true);
            setChecking(false);
          }
          return;
        }
      } catch (error) {
        // refresh failed
      }

      // 3. Refresh also failed – force login
      if (!cancelled) {
        setAllow(false);
        setChecking(false);
      }
    };

    runVerification();

    return () => { cancelled = true; };
  }, [isAuthenticated, authLoading]);

  if (authLoading || checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-color text-sm animate-pulse">
            Verifying your session…
          </p>
        </div>
      </div>
    );
  }

  if (!allow) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;