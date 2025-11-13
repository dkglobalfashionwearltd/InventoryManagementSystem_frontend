import { useEffect, useState } from "react";

export const getToken = () => {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const storeToken = localStorage.getItem("token");
    setToken(storeToken);
  }, []);
  return token;
};

export const getUserId = () => {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const store = localStorage.getItem("userId");
    setUserId(store);
  }, []);
  return userId;
};

export const getUserRole = () => {
  const [userRole, setUserRole] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    const store = localStorage.getItem("userRole");
    setUserRole(store);
  }, []);
  return userRole;
};

export const getTokenExpireTime = () => {
  const timeStr = localStorage.getItem("tokenExpire");
  if (!timeStr) return null;
  console.log(timeStr);

  const expiry = Date.parse(timeStr);
  return isNaN(expiry) ? null : expiry; // e.g., 1731500000000
};
