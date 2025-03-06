import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post("https://secrets-of-flowers-site.onrender.com/login", { username, password });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
      setUser({ token: res.data.token });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
