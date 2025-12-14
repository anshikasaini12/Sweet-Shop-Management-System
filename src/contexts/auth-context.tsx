'use client';

import type { User } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock user data
const mockUsers: Record<string, User> = {
  user: { id: 'usr_1', email: 'user@example.com', name: 'Test User', role: 'user' },
  admin: { id: 'adm_1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
};

type AuthContextType = {
  user: User | null;
  login: (role: 'user' | 'admin') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'user' | 'admin') => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
