
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('campusCircleUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('campusCircleUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would verify with a backend
    // For demo purposes, we'll create a user with the provided email
    // In production: Implement proper authentication here
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Mock user authentication
    const user: User = {
      email,
      name: email.split('@')[0], // Simple name derivation from email
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('campusCircleUser', JSON.stringify(user));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would send data to your backend
    // For demo purposes, we'll create and "store" the user locally
    
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }
    
    const user: User = {
      email,
      name,
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('campusCircleUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('campusCircleUser');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

