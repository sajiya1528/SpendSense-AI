import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dummyUser } from '../utils/dummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('spendsense_user');
    const token = localStorage.getItem('spendsense_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      ...dummyUser,
      email: credentials.email,
      name: credentials.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('spendsense_token', mockToken);
    localStorage.setItem('spendsense_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  }, []);

  const register = useCallback(async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      avatar: null,
      memberSince: new Date().toISOString().split('T')[0],
      currency: 'INR',
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('spendsense_token', mockToken);
    localStorage.setItem('spendsense_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('spendsense_token');
    localStorage.removeItem('spendsense_user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('spendsense_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
