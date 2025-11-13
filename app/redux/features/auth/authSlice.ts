import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiRequest } from "~/redux/data/GetData";
import { Login } from "~/redux/data/LoginData";

interface LoginReq {
  userName: string;
  password: string;
  rememberMe: boolean;
}
interface response {
  userId: string;
  role: string;
  token: string;
  tokenExpire: string;
}
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: response;
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
}
const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
};

export const LoginRequest = createAsyncThunk(
  "auth/login",
  async (
    {
      req,
    }: {
      req: LoginReq;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("slice", req);
      const res = await Login(req);
      console.log("sliceRes", res);
      return res;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    // clear token safely
    clearToken: (state) => {
      // clear local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("tokenExpire");
      return { ...initialState, data: null }; // reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginRequest.fulfilled, (state, action: PayloadAction<Data>) => {
        state.data = action.payload;
        if (state.data?.success) {
          localStorage.setItem("userId", state.data?.result?.userId);
          localStorage.setItem("token", state.data?.result?.token);
          localStorage.setItem("userRole", state.data?.result?.role);
          localStorage.setItem("tokenExpire", state.data?.result?.tokenExpire);
        }
        state.loading = false;
      })
      .addCase(LoginRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
