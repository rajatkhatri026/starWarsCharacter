import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    if (token && expiration) {
      const expirationTime = new Date(expiration).getTime();
      const currentTime = new Date().getTime();
      // Check if token is expired
      if (currentTime > expirationTime) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        return false;
      }
      return true;
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    if (token && expiration) {
      const expirationTime = new Date(expiration).getTime();
      const currentTime = new Date().getTime();

      // Check token expiration
      if (currentTime > expirationTime) {
        setIsAuthenticated(false); // Token expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
      }
    }
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    if (username === 'user' && password === 'password') {
      const token = 'fake-jwt-token'; // Mock token
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 15); // Token valid for 15 minutes
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenExpiration', expirationTime.toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
