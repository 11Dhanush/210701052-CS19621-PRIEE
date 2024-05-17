import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Assume user object contains prisonerId

  const login = async (phoneNo) => {
    try {
      const response = await axios.post('http://localhost:4000/login', { phoneNo });
      setUser(response.data); // Assuming response.data contains the user object with prisonerId
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);