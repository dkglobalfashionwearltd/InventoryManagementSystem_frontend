import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

type Item = {
  itemId: number;
  name: string;
  categoryName: string;
  assignedDate: string;
  remarks: string;
  assignAgainstTo: number;
  status: string;
};

type User = {
  itemUserId: number;
  officeId: number;
  name: string;
  departmentName: string;
  designation: string;
  items: Item[];
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: User[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: true,
  data: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const getAllAssignment = createAsyncThunk(
  "assig/getAllAssignment",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/assign/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get assigned data"
      );
    }
  }
);

export const createAssignment = createAsyncThunk(
  "assign/createAssignment",
  async (
    { token, formPayload }: { token: string | null; formPayload: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/assign/item-user`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create assignment"
      );
    }
  }
);

export const updateAssignment = createAsyncThunk(
  "assign/updateAssignment",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/assign/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update assignment"
      );
    }
  }
);

const assignSlice = createSlice({
  name: "assign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAssignment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createAssignment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAssignment.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(updateAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default assignSlice.reducer;
