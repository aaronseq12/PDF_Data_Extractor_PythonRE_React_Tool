import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('bh_user', null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const login = (credentials) => {
    setError(null);
    const users = JSON.parse(localStorage.getItem('bh_users') || '{}');
    if (users[credentials.ssoid] && users[credentials.ssoid].password === credentials.password) {
      setUser(users[credentials.ssoid]);
      navigate('/dashboard');
    } else {
      setError('Invalid SSOID or password.');
    }
  };

  const signup = (userInfo) => {
    setError(null);
    setMessage(null);
    const users = JSON.parse(localStorage.getItem('bh_users') || '{}');
    if (users[userInfo.ssoid]) {
      setError('SSOID already exists. Please choose another.');
    } else {
      users[userInfo.ssoid] = userInfo;
      localStorage.setItem('bh_users', JSON.stringify(users));
      setMessage('Account created successfully! You can now log in.');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, error, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
