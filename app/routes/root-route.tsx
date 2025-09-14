import { useEffect } from "react";

import { useNavigate } from "react-router";
import { useToken } from "~/components/getToken";

const RootRoute = () => {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    token ? navigate("/dashboard") : navigate("/auth/login");
  }, [token]);
};

export default RootRoute;
