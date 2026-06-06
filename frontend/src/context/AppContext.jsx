import { createContext, useState, useEffect, useMemo } from "react";
import { getToken, setToken, getUser, setUser, clearAuth } from "../utils/token.js";
import { logoutUser } from "../api/auth.api.js";
import { connectSocket, disconnectSocket } from "../services/socket.service.js";

const AuthContext = createContext();
export default AuthContext;

const normalizeUser = (userData) => {
  if (!userData) return null;
  return {
    ...userData,
    id: userData.id?.toString?.() || userData.id || userData._id?.toString?.(),
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => normalizeUser(getUser()));
  const [token, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.id) {
      connectSocket(user.id);
    }
    return () => disconnectSocket();
  }, [user?.id]);

  const login = (userData, accessToken) => {
    const normalized = normalizeUser(userData);
    setToken(accessToken);
    setUser(normalized);
    setAuthToken(accessToken);
    setUserState(normalized);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // proceed with local logout even if API fails
    }
    setUserState(null);
    setAuthToken(null);
    clearAuth();
    disconnectSocket();
  };

  const value = useMemo(() => ({
    user: user || normalizeUser(getUser()),
    token: token || getToken(),
    loading,
    login,
    logout,
    isAuthenticated: !!(token || getToken()),
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
