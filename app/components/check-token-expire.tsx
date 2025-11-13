import { useEffect } from "react";
import { useAppDispatch } from "~/redux/hook";
import { getTokenExpireTime } from "./getLocalStorage";
import { clearToken } from "~/redux/features/auth/authSlice";

const CheckTokenExpire = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkExpiration = () => {
      const tokenExpire = getTokenExpireTime();
      console.log("🔄 Checking token expiry:", tokenExpire);

      if (!tokenExpire) return;

      const now = Date.now();
      const timeLeft = tokenExpire - now;

      console.log(
        "🕒 Token expires in:",
        Math.round(timeLeft / 1000),
        "seconds"
      );

      if (timeLeft <= 0) {
        console.log("❌ Token expired — clearing and reloading...");
        dispatch(clearToken());
        window.location.reload();
        return true; // expired
      }

      return false; // still valid
    };

    // 🟢 Check immediately once
    const expired = checkExpiration();

    // ❌ If expired, don’t schedule further checks
    if (expired) return;

    // ✅ Otherwise, check again every 30 minutes
    const interval = setInterval(checkExpiration, 30 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default CheckTokenExpire;
