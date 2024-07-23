import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const setToken = (data) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
