import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.currentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(AuthService.currentUser());
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await AuthService.login(credentials);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
