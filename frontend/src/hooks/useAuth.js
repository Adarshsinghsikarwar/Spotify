import { useContext } from "react";
import { registerUser, loginUser, logoutUser } from "../services/auth.api";
import { AuthContext } from "../context/Auth.context";

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useContext(AuthContext);

  const handleRegister = async (userData) => {
    const response = await registerUser(userData);
    setUser(response.user);
  };

  const handleLogin = async (userData) => {
    const response = await loginUser(userData);
    setUser(response.user);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
