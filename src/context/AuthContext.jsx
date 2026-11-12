import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../services/demoDataService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default to Alex Morgan (Client)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('trustlance_user');
    return saved ? JSON.parse(saved) : USERS.alex;
  });

  useEffect(() => {
    localStorage.setItem('trustlance_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (role) => {
    if (role === 'client') {
      setCurrentUser(USERS.alex);
    } else {
      setCurrentUser(USERS.jordan);
    }
  };

  const loginAs = (userId) => {
    if (userId === 'client' || userId === USERS.alex.id) {
      setCurrentUser(USERS.alex);
    } else if (userId === 'freelancer' || userId === USERS.jordan.id) {
      setCurrentUser(USERS.jordan);
    }
  };

  const isClient = currentUser.role === 'client';
  const isFreelancer = currentUser.role === 'freelancer';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        loginAs,
        isClient,
        isFreelancer,
      }}
    >
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
