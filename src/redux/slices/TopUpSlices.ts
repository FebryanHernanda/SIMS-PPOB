// state managemetn
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AxiosError } from "axios";
import { setBalance } from "./BalanceSlice";
interface TopupData {
  top_up_amount: number;
}

interface TopupResponse {
  topup_id: string;
  top_up_amount: number;
}

interface TopupState {
  nominal: string;
  loading: boolean;
  error: string | null;
  lastTopupId: string | null;
}

const initialState: TopupState = {
  nominal: "",
  loading: false,
  error: null,
  lastTopupId: null,
};

export const postTopup = createAsyncThunk<
  TopupResponse,
  TopupData,
  { rejectValue: string }
>("topup/postTopup", async (topupData, { rejectWithValue, dispatch }) => {
  if (
    typeof topupData.top_up_amount !== "number" ||
    topupData.top_up_amount <= 0
  ) {
    return rejectWithValue("Nominal harus diisi dan harus lebih besar dari 0");
  }

  try {
    const response = await api.post("/topup", {
      top_up_amount: topupData.top_up_amount,
      transaction_type: "TOPUP",
    });

    const balanceResponse = await api.get("/balance");

    dispatch(setBalance(balanceResponse.data.data.balance));

    return response.data.data;
  } catch (err) {
    let errorMessage = "Terjadi kesalahan saat topup";

    if (err && typeof err === "object" && "isAxiosError" in err) {
      const axiosError = err as AxiosError<{ message: string }>;
      errorMessage = axiosError.response?.data?.message || errorMessage;
    }

    return rejectWithValue(errorMessage);
  }
});

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    setNominal: (state, action: PayloadAction<string>) => {
      state.nominal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTopup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postTopup.fulfilled, (state, action) => {
      state.loading = false;
      state.lastTopupId = action.payload.topup_id;
    });
    builder.addCase(postTopup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setNominal } = topupSlice.actions;
export default topupSlice.reducer;
