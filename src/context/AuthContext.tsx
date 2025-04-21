
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Gender } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    major: string,
    age?: number,
    gender?: Gender
  ) => Promise<void>;
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
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    // Retrieve user info from "database" (mocked)
    const storedUser = localStorage.getItem('campusCircleUser');
    let user: User | null = null;
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.email === email) {
        user = parsed;
      }
    }
    if (!user) {
      user = {
        email,
        name: email.split('@')[0],
        major: '',
      };
    }
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('campusCircleUser', JSON.stringify(user));
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    major: string,
    age?: number,
    gender?: Gender
  ) => {
    if (!name || !email || !password || !major) {
      throw new Error('Name, email, password, and major are required');
    }
    const user: User = {
      email,
      name,
      major,
      age,
      gender,
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
