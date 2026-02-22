import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
        localStorage.removeItem('user');
      }
    }
    return null;
  });
  
  /* const [activeTable, setActiveTable] = useState(null);

  useEffect(() => {
    if (user && user.activeTable) {
        setActiveTable(user.activeTable);
    } else {
        setActiveTable(null);
    }
  }, [user]); */

  const login = async (username, password) => {
    const data = await api.login({ username, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const register = async (username, password) => {
    await api.register({ username, password });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const occupyTable = async (tableId) => {
    try {
        await api.occupyTable(user.username, tableId);
        const updatedUser = { ...user, activeTable: tableId };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Failed to occupy table", error);
        throw error;
    }
  };

  const leaveTable = async () => {
    try {
        await api.releaseTable(user.username);
        const updatedUser = { ...user, activeTable: null };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Failed to release table", error);
        throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, activeTable: user?.activeTable, occupyTable, leaveTable }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
