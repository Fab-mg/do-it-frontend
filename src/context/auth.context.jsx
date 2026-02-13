/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { userLogin } from "../services/auth.service";
import { getMe } from "../services/user.service";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "do_it_auth";

const readPersistedAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const rawAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawAuth) {
    return { user: null, token: null };
  }

  try {
    const parsedAuth = JSON.parse(rawAuth);
    return {
      user: parsedAuth?.user || null,
      token: parsedAuth?.token || null,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return { user: null, token: null };
  }
};

const persistAuth = (user, token) => {
  if (typeof window === "undefined") {
    return;
  }

  if (user && token) {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, token }),
    );
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readPersistedAuth);
  const { user, token } = authState;

  const setAuth = useCallback((nextUser, nextToken) => {
    setAuthState({ user: nextUser, token: nextToken });
    persistAuth(nextUser, nextToken);
  }, []);

  const login = useCallback(
    async (credentials) => {
      try {
        const data = await userLogin(credentials);
        if (data.access_token) {
          const me = await getMe(data.access_token);
          setAuth(me, data.access_token);
          return me;
        }
        setAuth(null, null);
        return null;
      } catch {
        setAuth(null, null);
        return null;
      }
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth(null, null);
  }, [setAuth]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && token),
      login,
      token,
      logout,
    }),
    [user, token, login, logout],
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
