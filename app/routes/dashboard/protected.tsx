// routes/protected.tsx
import React from "react";
import { Outlet, Navigate } from "react-router";
import { useToken } from "~/components/getToken";
import LoadingSpinner from "~/components/loading";

export default function Protected() {
  const token = useToken();

  if (token === undefined) {
    // still checking (localStorage, cookie, etc.)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
