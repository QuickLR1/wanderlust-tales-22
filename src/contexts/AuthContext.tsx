import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Validate inputs
      if (!name || name.length < 2) {
        toast.error('Name must be at least 2 characters long');
        return false;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address');
        return false;
      }

      if (!password || password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return false;
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        toast.error('Password must contain uppercase, lowercase, and number');
        return false;
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: User) => u.email === email)) {
        toast.error('An account with this email already exists');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      };

      // Store password separately (in real app, this would be hashed)
      const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
      passwords[email] = password;
      localStorage.setItem('passwords', JSON.stringify(passwords));

      // Add user to users list
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);

      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to create account');
      return false;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validate inputs
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address');
        return false;
      }

      if (!password) {
        toast.error('Please enter your password');
        return false;
      }

      // Check credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.email === email);

      if (!foundUser) {
        toast.error('No account found with this email');
        return false;
      }

      const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
      if (passwords[email] !== password) {
        toast.error('Incorrect password');
        return false;
      }

      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);

      toast.success('Welcome back!');
      return true;
    } catch (error) {
      toast.error('Failed to sign in');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
