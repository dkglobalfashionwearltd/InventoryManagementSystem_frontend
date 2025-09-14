import axios from "axios";
export const Login = async (
  username: string,
  password: string,
  baseUrl: string
) => {
  console.log(username, password, baseUrl);
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/auth/user/login`,
      {},
      {
        params: { userName: username, password: password },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
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
