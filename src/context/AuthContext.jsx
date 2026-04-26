import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE = "https://webdev-backends.onrender.com/flowers";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setUser({ token });
    }
  }, []);

  // Global 401 interceptor: any expired/invalid token bounces the user out
  // gracefully instead of letting the UI silently break.
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          axios.defaults.headers.common["Authorization"] = null;
          setUser(null);
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, []);

  const login = async (username, password) => {
    // Let the caller see errors so the LoginPage can show them.
    const res = await axios.post(`${API_BASE}/login`, { username, password });
    const token = res.data?.token;
    if (!token) throw new Error("No token returned from server");
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;
    setUser({ token });
    return token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
