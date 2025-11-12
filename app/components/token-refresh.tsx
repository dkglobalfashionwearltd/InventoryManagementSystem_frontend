import { useEffect } from "react";
import { refreshToken } from "~/redux/features/auth/authSliceNew";
import { useAppDispatch, useAppSelector } from "~/redux/hook";

const TokenRefresher = () => {
  const dispatch = useAppDispatch();
  const { loginData, loading } = useAppSelector((state) => state.loginNew);

  useEffect(() => {
    if (!loginData?.result) return;
    // ✅ Immediately refresh once on mount
    dispatch(refreshToken({ baseUrl: "https://localhost:7189" }));

    // ✅ Set interval to refresh every 30 minutes
    const interval = setInterval(() => {
      console.log("🔄 Refreshing token...");
      dispatch(refreshToken({ baseUrl: "https://localhost:7189" }));
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // ✅ Cleanup on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return null; // no UI, runs silently
};

export default TokenRefresher;
