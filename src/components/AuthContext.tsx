import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useCurrentUser } from "../hooks/useAuth";
import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (error) {
      // Only clear tokens on 401 Unauthorized, not all errors
      const errorStatus = (error as { response?: { status?: number } })
        ?.response?.status;
      if (errorStatus === 401) {
        console.log("401 Unauthorized - clearing tokens:", error.message);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      } else {
        console.log("Auth error (not 401) - keeping tokens:", error.message);
      }
    }
  }, [error]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
