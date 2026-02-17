import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'Demo User', type: 'demo' });

  // Mock login for UI demo
  const login = (username, password) => {
    console.log('Login attempt:', username);
    if (username === 'admin') {
      setUser({ username: 'admin', type: 'admin' });
    } else {
      setUser({ username: 'customer', type: 'customer' });
    }
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const register = () => {
    console.log('Register attempt');
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
