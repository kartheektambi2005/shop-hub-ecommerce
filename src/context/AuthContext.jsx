import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function loadUserFromStorage() {
  try {
    const stored = localStorage.getItem('shophub-user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUserFromStorage);

  useEffect(() => {
    if (user) {
      localStorage.setItem('shophub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shophub-user');
    }
  }, [user]);

  const login = (email) => {
    setUser({ email, name: email.split('@')[0] });
  };

  const register = (name, email) => {
    setUser({ name, email });
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
