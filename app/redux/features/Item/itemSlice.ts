import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

export type Item = {
  itemId: number;
  name: string;
  modelNumber: string;
  brandName: string;
  price: number;
  purchaseDate: string;
  sourceName: string;
  sourcePhoneNumber: string;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceProviderName: string;
  serviceProviderPhoneNumber: string;
  warrantyEnd: string;
  category: {
    categoryId: number;
    name: string;
    status: string;
  };
  status: string;
};
export interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Item[];
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

export const getAllItem = createAsyncThunk(
  "item/getAllItem",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      // const res = await apiRequest(
      //   "get",
      //   `${baseUrl}/api/item/getall`,
      //   token,
      //   "application/json",
      //   {},
      //   null
      // );
      const { data: res } = await axios({
        method: "get", // ✅ HTTP method
        url: "https://localhost:7189/api/item/getall", // ✅ backend API URL
        withCredentials: true, // ✅ send cookies
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get item data"
      );
    }
  }
);

export const createItem = createAsyncThunk(
  "item/createItem",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/item/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create item"
      );
    }
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/item/update`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update item"
      );
    }
  }
);

const itemSlice = createSlice({
  name: "item-",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllItem.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default itemSlice.reducer;
