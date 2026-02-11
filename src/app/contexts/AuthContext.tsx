import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  continueAsGuest: () => void;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('pm_user');
    const storedGuest = localStorage.getItem('pm_guest');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedGuest === 'true') {
      setIsGuest(true);
      setUser({
        id: 'guest',
        name: 'Guest User',
        email: 'guest@example.com',
      });
    }
  }, []);

  const login = (name: string, email: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem('pm_user', JSON.stringify(newUser));
    localStorage.removeItem('pm_guest');
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
    };
    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem('pm_guest', 'true');
    localStorage.removeItem('pm_user');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('pm_user');
    localStorage.removeItem('pm_guest');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, continueAsGuest, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
