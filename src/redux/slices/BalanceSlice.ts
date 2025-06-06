import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "../../services/api";

interface BalanceState {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: 0,
  loading: false,
  error: null,
};

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/balance");
      return response.data.data.balance;
    } catch (err) {
      let errorMessage = "Gagal mengambil data balance";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBalance, updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
