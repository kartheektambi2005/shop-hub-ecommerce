import { createContext, useContext, useEffect, useState } from 'react';
import { loadStored, removeStored, saveStored } from '../utils/storage';

const AuthContext = createContext(null);

const STORAGE_KEY = 'shophub-user';

const isUser = (value) =>
  value !== null &&
  typeof value === 'object' &&
  typeof value.name === 'string' &&
  typeof value.email === 'string';

// Demo auth only: there is no server, so we remember who "logged in" but never keep a password.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStored(STORAGE_KEY, null, isUser));

  useEffect(() => {
    if (user) saveStored(STORAGE_KEY, user);
    else removeStored(STORAGE_KEY);
  }, [user]);

  const login = (email) => {
    const cleanEmail = email.trim();
    setUser({ email: cleanEmail, name: cleanEmail.split('@')[0] });
  };

  const register = (name, email) => {
    setUser({ name: name.trim(), email: email.trim() });
  };

  const logout = () => setUser(null);

  const value = { user, isAuthenticated: Boolean(user), login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
