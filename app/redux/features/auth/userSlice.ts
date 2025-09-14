import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { use } from "react";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

interface response {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
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

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/auth/user/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get users data"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (
    { userId, token }: { userId: string; token: string | null },
    { rejectWithValue }
  ) => {
    try {
      console.log(userId);
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/auth/user/get`,
        token,
        "application/json",
        { userId }
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get user data"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export default userSlice.reducer;
