import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

type ItemUser = {
  itemUserId: number;
  officeId: number;
  name: string;
  phoneNumber: string;
  designation: string;
  department: {
    departmentId: string;
    name: string;
  };
  status: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: ItemUser[];
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

export const getAllItemUser = createAsyncThunk(
  "item-user/getAllItemUser",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/item-user/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get item-user data"
      );
    }
  }
);

export const createItemUser = createAsyncThunk(
  "item-user/createItemUser",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/item-user/create`,
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

export const updateItemUser = createAsyncThunk(
  "item-user/updateItemUser",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/item-user/update`,
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

const itemUserSlice = createSlice({
  name: "item-user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItemUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllItemUser.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllItemUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createItemUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createItemUser.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(createItemUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateItemUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateItemUser.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
          state.refresh = !state.refresh;
        }
      )
      .addCase(updateItemUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default itemUserSlice.reducer;
