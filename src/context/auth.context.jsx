/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { userLogin } from "../services/auth.service";
import { getMe } from "../services/user.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    try {
      const data = await userLogin(credentials);
      let me = null;
      if (data.access_token) {
        me = await getMe(data.access_token);
        setUser(me);
        setToken(data.access_token);
        return me;
      } else {
        setUser(null);
        setToken(null);
        return me;
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      token,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
