import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { mockUser, mockCustomer } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  role: 'farmer' | 'customer' | null;
  login: (email: string, password: string, role: 'farmer' | 'customer') => boolean;
  signup: (name: string, email: string, password: string, phone: string, role: 'farmer' | 'customer') => boolean;
  switchRole: (newRole: 'farmer' | 'customer') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to mockUser & farmer role so the app works seamlessly out of the box
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [role, setRole] = useState<'farmer' | 'customer' | null>('farmer');

  useEffect(() => {
    const stored = localStorage.getItem('agri_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.user && parsed.role) {
        setCurrentUser(parsed.user);
        setRole(parsed.role);
      }
    } else {
      localStorage.setItem('agri_auth', JSON.stringify({ user: mockUser, role: 'farmer' }));
    }
  }, []);

  const switchRole = (newRole: 'farmer' | 'customer') => {
    const user = newRole === 'farmer' ? mockUser : mockCustomer;
    setCurrentUser(user);
    setRole(newRole);
    localStorage.setItem('agri_auth', JSON.stringify({ user, role: newRole }));
  };

  const login = (_email: string, _password: string, selectedRole: 'farmer' | 'customer'): boolean => {
    const user = selectedRole === 'farmer' ? mockUser : mockCustomer;
    setCurrentUser(user);
    setRole(selectedRole);
    localStorage.setItem('agri_auth', JSON.stringify({ user, role: selectedRole }));
    return true;
  };

  const signup = (name: string, email: string, _password: string, phone: string, selectedRole: 'farmer' | 'customer'): boolean => {
    const newUser: User = {
      id: selectedRole === 'farmer' ? 'farmer-new' : 'customer-new',
      name,
      email,
      phone,
      role: selectedRole,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentUser(newUser);
    setRole(selectedRole);
    localStorage.setItem('agri_auth', JSON.stringify({ user: newUser, role: selectedRole }));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
    localStorage.removeItem('agri_auth');
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, login, signup, switchRole, logout, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
