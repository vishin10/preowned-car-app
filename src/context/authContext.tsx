import React, { createContext, useContext } from "react";

type AuthContextType = {
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAdmin: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = localStorage.getItem("role"); // You can replace this with real auth

  return (
    <AuthContext.Provider value={{ isAdmin: role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
