import {createContext, useState, useEffect,} from "react";
import {getToken, setToken, removeToken,} from "../utils/token.js";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children,}) => {
  const [user, setUser] = useState(null);
  const [token, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser({isAuthenticated: true,});
    }
    setLoading(false);
  }, [token]);

  const login = ( userData, accessToken) => {
    setUser(userData);
    setAuthToken(accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated:!!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};