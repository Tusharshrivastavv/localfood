import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { apiFetch } from "../utils/api";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);

  const [shop, setShop] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadUser = async () => {
    const token =
      localStorage.getItem(
        "localbite_token"
      );

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data =
        await apiFetch("/auth/me");

      setUser(data.user);
      setShop(data.shop);
    } catch (error) {
      localStorage.removeItem(
        "localbite_token"
      );

      setUser(null);
      setShop(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const data =
      await apiFetch("/auth/login", {
        method: "POST",

        body: JSON.stringify({
          email,
          password
        })
      });

    localStorage.setItem(
      "localbite_token",
      data.token
    );

    setUser(data.user);
    setShop(data.shop);

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      "localbite_token"
    );

    setUser(null);
    setShop(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        shop,
        loading,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);