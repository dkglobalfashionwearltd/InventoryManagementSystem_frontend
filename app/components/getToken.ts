import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

// export const useToken = () => {
//   const [token, setToken] = useState<string | null | undefined>(undefined);

//   useEffect(() => {
//     // const storeToken = localStorage.getItem("token");
//     const storeToken = document.cookie("session_token");
//     setToken(storeToken);
//   }, []);
//   return token;
// };

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    const storedToken = getCookie("session_token");
    setToken(storedToken);
  }, []);

  return token;
};

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    const storedUserId = getCookie("user_id");
    setUserId(storedUserId);
  }, []);

  return userId;
};

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    const storedUserRole = getCookie("user_role");
    setUserRole(storedUserRole);
  }, []);

  return userRole;
};
