import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  return token;
};

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const storeUserId = localStorage.getItem("userId");
    setUserId(storeUserId);
  }, []);
  return userId;
};

export const useRole = () => {
  const [userRole, setUserRole] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    const storeUserRole = localStorage.getItem("userRole");
    setUserRole(storeUserRole);
  }, []);
  return userRole;
};
