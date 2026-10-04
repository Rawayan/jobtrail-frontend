import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { loginUser } from "../api/auth";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  access: "access",
  refresh: "refresh",
  username: "username",
  email: "email",
};

const EMPTY_SESSION = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

function readSession() {
  const accessToken = localStorage.getItem(STORAGE_KEYS.access);
  const username = localStorage.getItem(STORAGE_KEYS.username);

  if (!accessToken || !username) {
    return EMPTY_SESSION;
  }

  return {
    accessToken,
    refreshToken: localStorage.getItem(STORAGE_KEYS.refresh),
    user: {
      username,
      email: localStorage.getItem(STORAGE_KEYS.email) || "",
    },
  };
}

function clearStorage() {
  Object.values(STORAGE_KEYS).forEach((key) =>
    localStorage.removeItem(key)
  );
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback(async (username, password) => {
    const data = await loginUser({ username, password });

    const user = { username, email: data.user?.email || "" };

    localStorage.setItem(STORAGE_KEYS.access, data.access);
    localStorage.setItem(STORAGE_KEYS.refresh, data.refresh);
    localStorage.setItem(STORAGE_KEYS.username, user.username);
    localStorage.setItem(STORAGE_KEYS.email, user.email);

    setSession({
      accessToken: data.access,
      refreshToken: data.refresh,
      user,
    });

    return user;
  }, []);

  const logout = useCallback(() => {
    clearStorage();
    setSession(EMPTY_SESSION);
  }, []);

  const value = useMemo(
    () => ({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
      isAuthenticated: Boolean(session.accessToken && session.user),
      login,
      logout,
    }),
    [session, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}