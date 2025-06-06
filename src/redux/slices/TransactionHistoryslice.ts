import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TransactionData } from "./PembayaranSlices";
import api from "../../services/api";
import type { AxiosError } from "axios";

interface TransactionHistoryState {
  transactions: TransactionData[];
  loading: boolean;
  error: string | null;
}
const initialState: TransactionHistoryState = {
  transactions: [],
  loading: false,
  error: null,
};

export const getTransactionHistory = createAsyncThunk<
  TransactionData[],
  void,
  { rejectValue: string }
>("transaction/fetchTransactionHistory", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/transaction/history");
    return response.data.data.records as TransactionData[];
  } catch (err) {
    let errorMessage = "Gagal mengambil data transaksi";

    if (err && typeof err === "object" && "isAxiosError" in err) {
      const axiosError = err as AxiosError<{ message: string }>;
      errorMessage = axiosError.response?.data?.message || errorMessage;
    }

    return rejectWithValue(errorMessage);
  }
});

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getTransactionHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default transactionHistorySlice.reducer;
