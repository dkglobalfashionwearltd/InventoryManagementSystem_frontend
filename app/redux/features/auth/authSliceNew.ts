// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import axios from "axios";

// interface LoginReq {
//   username: string;
//   password: string;
//   rememberMe?: boolean;
// }
// interface LoginPayload {
//   baseUrl: string;
//   data: LoginReq;
// }

// interface AuthState {
//   userId: string | null;
//   role: string | null;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   userId: null,
//   role: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

// // -------------------- Thunks --------------------

// // Login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (payload: LoginPayload, { rejectWithValue }) => {
//     const { baseUrl, data } = payload;
//     try {
//       const res = await axios.post(`${baseUrl}/api/auth/user/login-new`, data, {
//         withCredentials: true, // send HTTP-only cookies
//       });
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Refresh Token
// export const refreshToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         "/api/auth/user/refresh-token",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Refresh failed");
//     }
//   }
// );

// // Logout
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         "/api/auth/user/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // -------------------- Slice --------------------

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuthState: (state) => {
//       state.userId = null;
//       state.role = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         if (action.payload.success) {
//           state.userId = action.payload.result.userId;
//           state.role = action.payload.result.role;
//           state.isAuthenticated = true;
//         } else {
//           state.error = action.payload.message;
//           state.isAuthenticated = false;
//         }
//       })
//       .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       })

//       // Refresh token
//       .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
//         // With cookie-based auth, we usually don't need to update state
//         // unless your backend returns new user info
//         if (action.payload.success) {
//           state.isAuthenticated = true;
//         } else {
//           state.isAuthenticated = false;
//         }
//       })

//       // Logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.userId = null;
//         state.role = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       });
//   },
// });

// export const { clearAuthState } = authSlice.actions;
// export default authSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginReq {
  username: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  userId: string;
  role: string;
  token: string;
}
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: LoginResponse;
}

interface AuthState {
  loginData: Data | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loginData: null,
  loading: false,
  error: null,
};

// ------------------- Thunks -------------------

// Login
export const loginUser = createAsyncThunk<
  Data, // returned data
  { baseUrl: string; data: LoginReq }, // argument
  { rejectValue: string }
>("auth/loginUser", async ({ baseUrl, data }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/user/login-new`, data, {
      withCredentials: true, // send HTTP-only cookies
    });
    return res?.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Login failed";
    return rejectWithValue(errorMessage);
  }
});

// Refresh token
// export const refreshToken = createAsyncThunk<
//   LoginResponse,
//   { baseUrl: string },
//   { rejectValue: string }
// >("auth/refreshToken", async ({ baseUrl }, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(
//       `${baseUrl}/api/auth/user/refresh-token`,
//       {},
//       {
//         withCredentials: true,
//       }
//     );
//     if (!res.data.success) return rejectWithValue(res.data.message);
//     return res.data.result as LoginResponse;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Refresh failed");
//   }
// });

// authSliceNew.ts
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async ({ baseUrl }: { baseUrl: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/user/refresh-token`,
        {},
        {
          withCredentials: true, // send HTTP-only cookie
        }
      );

      return res?.data; // backend should return { userId, role }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Refresh failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk<
  Data,
  { baseUrl: string },
  { rejectValue: string }
>("auth/logoutUser", async ({ baseUrl }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/auth/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Logout failed");
  }
});

// ------------------- Slice -------------------

const authSliceNew = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.loginData = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.loginData = action?.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Login failed";
      });

    // Refresh
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.loginData = action?.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.loginData = null;
        state.error = "Session expired";
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.loginData = action?.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Logout failed";
      });
  },
});

export const { resetAuth } = authSliceNew.actions;
export default authSliceNew.reducer;
