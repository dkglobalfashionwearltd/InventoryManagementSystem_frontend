import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

type Department = {
  departmentId: number;
  name: string;
  status: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Department[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: false,
  data: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const getAllDepartment = createAsyncThunk(
  "department/getAllDepartment",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/department/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get department data"
      );
    }
  }
);

export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/department/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create department"
      );
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/department/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update department"
      );
    }
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDepartment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDepartment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDepartment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default departmentSlice.reducer;
