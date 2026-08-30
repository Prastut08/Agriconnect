import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import { auth, farmerAuth } from '../lib/firebase';
import type { User } from '../types';
import { mockUser, mockCustomer } from '../data/mockData';

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

interface AuthContextType {
  currentUser: User | null;
  role: 'farmer' | 'customer' | null;
  loading: boolean;
  login: (email: string, password: string, role: 'farmer' | 'customer') => Promise<AuthResponse>;
  signup: (name: string, email: string, password: string, phone: string, role: 'farmer' | 'customer') => Promise<AuthResponse>;
  switchRole: (newRole: 'farmer' | 'customer') => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<'farmer' | 'customer' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage first for saved session
    const stored = localStorage.getItem('agri_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.user && parsed.role) {
          setCurrentUser(parsed.user);
          setRole(parsed.role);
        }
      } catch (e) {
        console.error('Failed to parse agri_auth from localStorage', e);
      }
    }

    // Listeners for Firebase auth changes
    const unsubFarmer = onAuthStateChanged(farmerAuth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userObj: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Farmer User',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          role: 'farmer',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
        setRole('farmer');
        localStorage.setItem('agri_auth', JSON.stringify({ user: userObj, role: 'farmer' }));
      }
      setLoading(false);
    });

    const unsubCustomer = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userObj: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Customer User',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          role: 'customer',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
        setRole('customer');
        localStorage.setItem('agri_auth', JSON.stringify({ user: userObj, role: 'customer' }));
      }
      setLoading(false);
    });

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      unsubFarmer();
      unsubCustomer();
      clearTimeout(timeout);
    };
  }, []);

  const switchRole = (newRole: 'farmer' | 'customer') => {
    const user = newRole === 'farmer' ? mockUser : mockCustomer;
    setCurrentUser(user);
    setRole(newRole);
    localStorage.setItem('agri_auth', JSON.stringify({ user, role: newRole }));
  };

  const login = async (email: string, password: string, selectedRole: 'farmer' | 'customer'): Promise<AuthResponse> => {
    const targetAuth = selectedRole === 'farmer' ? farmerAuth : auth;
    try {
      const cred = await signInWithEmailAndPassword(targetAuth, email, password);
      const userObj: User = {
        id: cred.user.uid,
        name: cred.user.displayName || (selectedRole === 'farmer' ? 'Farmer' : 'Customer'),
        email: cred.user.email || email,
        phone: cred.user.phoneNumber || '',
        role: selectedRole,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCurrentUser(userObj);
      setRole(selectedRole);
      localStorage.setItem('agri_auth', JSON.stringify({ user: userObj, role: selectedRole }));
      return { success: true, user: userObj };
    } catch (err: any) {
      console.warn('Firebase login error:', err);
      // Fallback for mock/demo login if credentials match demo credentials
      if (email === 'demo@farmer.com' || email === 'demo@customer.com' || email === 'farmer@agri.com' || email === 'customer@agri.com') {
        const mock = selectedRole === 'farmer' ? mockUser : mockCustomer;
        setCurrentUser(mock);
        setRole(selectedRole);
        localStorage.setItem('agri_auth', JSON.stringify({ user: mock, role: selectedRole }));
        return { success: true, user: mock };
      }

      let errorMsg = err.message || 'Authentication failed.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMsg = 'Invalid email or password. Please check credentials or sign up.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'The email address format is invalid.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please try again later.';
      }
      return { success: false, error: errorMsg };
    }
  };

  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    phone: string, 
    selectedRole: 'farmer' | 'customer'
  ): Promise<AuthResponse> => {
    const targetAuth = selectedRole === 'farmer' ? farmerAuth : auth;
    try {
      const cred = await createUserWithEmailAndPassword(targetAuth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name }).catch(() => {});
      }
      const newUser: User = {
        id: cred.user.uid,
        name: name || cred.user.displayName || (selectedRole === 'farmer' ? 'New Farmer' : 'New Customer'),
        email: cred.user.email || email,
        phone: phone || '',
        role: selectedRole,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCurrentUser(newUser);
      setRole(selectedRole);
      localStorage.setItem('agri_auth', JSON.stringify({ user: newUser, role: selectedRole }));
      return { success: true, user: newUser };
    } catch (err: any) {
      console.warn('Firebase signup error:', err);
      let errorMsg = err.message || 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'An account with this email already exists. Try signing in instead.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      }
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await signOut(farmerAuth).catch(() => {});
      await signOut(auth).catch(() => {});
    } finally {
      setCurrentUser(null);
      setRole(null);
      localStorage.removeItem('agri_auth');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, loading, login, signup, switchRole, logout, isAuthenticated: !!currentUser }}>
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

