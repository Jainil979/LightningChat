// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { login as loginService, getMe, logout as logoutService } from '../services/authService';
import { useToast } from './ToastContext';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // On mount: check if user is already authenticated
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const userData = await getMe();
        if (!cancelled && userData && userData.success) {
          setUser({
            userId: Number(userData.userId), // userData.userId,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        }
      } catch {
        // Not authenticated – stay logged out
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    check();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (credentials) => {
    await loginService(credentials);
    const userData = await getMe();
    if (userData && userData.success) {
      setUser({
        userId: Number(userData.userId), // userData.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    } else {
      throw new Error('Could not fetch user data after login.');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch {
      // ignore errors – we still want to clear client state
    } finally {
      setUser(null);
      addToast('Logged out successfully', 'success');
      navigate('/');
    }
  }, [addToast, navigate]);

  // Merge updated fields into the user object (used after profile update)
  const updateUser = useCallback((updates) => {
    setUser((prev) => prev ? { ...prev, ...updates } : null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};