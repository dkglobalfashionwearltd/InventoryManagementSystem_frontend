import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";
import { apiRequest } from "~/redux/data/GetData";

export type Stock = {
  stockId: number;
  itemId: number;
  itemName: string;
  itemModel: string;
  totalGivenQuantity: string;
  lastQuantity: string;
  currentQuantity: string;
  purchaseDate: string;
  stockedAt: string;
  lastStockedAt: string;
  stockOutAt: string;
  stockCount: string;
};
export interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Stock[];
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

export const getAllStock = createAsyncThunk(
  "stocks/getAllStock",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/stocks/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get stock data"
      );
    }
  }
);

export const manageStock = createAsyncThunk(
  "stocks/manageStock",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/stocks/manage`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create stock"
      );
    }
  }
);

export const updateStock = createAsyncThunk(
  "stocks/updateStock",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/stocks/manage`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update stock"
      );
    }
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStock.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(manageStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(manageStock.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
        state.refresh = !state.refresh;
      })
      .addCase(manageStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.refresh = !state.refresh;
      });
  },
});

export default stockSlice.reducer;
