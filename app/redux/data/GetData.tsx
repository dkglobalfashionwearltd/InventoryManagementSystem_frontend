import axios from "axios";
import { toast } from "sonner";

type Params = {
  [key: string]: any;
};

export const apiRequest = async (
  method: "get" | "post" | "delete",
  url: string,
  token: string | null,
  contentType: string = "application/json",
  params: Params = {},
  formData?: any
) => {
  try {
    const { data } = await axios({
      method,
      url,
      params: method === "get" ? params : undefined, // ✅ only for GET
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
        "Content-Type": contentType,
      },
      data: method !== "get" ? formData || params : undefined, // ✅ only for POST/DELETE
    });
    // console.log("API Response:", data);
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      }; // ✅ plain JSON
    }
    return {
      success: false,
      message: "Unexpected error",
    };
  }
};
