import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export const useToken = () => {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(null);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(storedToken);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        setToken(storedToken);
      } else {
        // expired
        localStorage.removeItem("token");
        setToken(null);
      }
    } catch {
      // malformed token
      localStorage.removeItem("token");
      setToken(null);
    }
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
