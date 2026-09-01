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
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<'farmer' | 'customer' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Clear any stale localStorage session — Firebase is the sole auth source
    localStorage.removeItem('agri_auth');

    let farmerResolved = false;
    let customerResolved = false;

    const tryFinishLoading = () => {
      if (farmerResolved && customerResolved) {
        setLoading(false);
      }
    };

    // Farmer Firebase auth listener
    const unsubFarmer = onAuthStateChanged(farmerAuth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userObj: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Farmer',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          role: 'farmer',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
        setRole('farmer');
      }
      farmerResolved = true;
      tryFinishLoading();
    });

    // Customer Firebase auth listener
    const unsubCustomer = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userObj: User = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Customer',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          role: 'customer',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCurrentUser(userObj);
        setRole('customer');
      }
      customerResolved = true;
      tryFinishLoading();
    });

    // Safety timeout — never hang on loading forever
    const timeout = setTimeout(() => setLoading(false), 3000);

    return () => {
      unsubFarmer();
      unsubCustomer();
      clearTimeout(timeout);
    };
  }, []);



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
    <AuthContext.Provider value={{ currentUser, role, loading, login, signup, logout, isAuthenticated: !!currentUser }}>
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

