import axios from "axios";
import { baseUrl } from "~/components/data";
interface LoginReq {
  userName: string;
  password: string;
  rememberMe: boolean;
}
export const Login = async (req: LoginReq) => {
  console.log(req);
  try {
    const { data } = await axios.post(`${baseUrl}/api/auth/user/login`, req, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    return data; // your user data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        console.error("Network error – server unreachable or CORS issue");
      } else {
        console.error("Axios error:", error.response?.data || error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return error;
  }
};
