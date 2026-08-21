"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    // Restore user safely
    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }

    // Restore token safely
    if (savedToken && savedToken !== "undefined" && savedToken !== "null") {
      setToken(savedToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }

    setLoading(false);
  }, []);

  const login = ({ user, token }) => {
    if (!user || !token) {
      console.error("Login failed: user or token missing");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};