import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import api from "../../services/api";
import type { AxiosError } from "axios";
import { getBalance } from "./BalanceSlice";

export interface TransactionData {
  invoice_number: string;
  service_code?: string;
  service_name?: string;
  transaction_type?: "PAYMENT" | "TOPUP";
  total_amount: number;
  created_on: string;
  description: string;
}

interface PaymentState {
  nominal: string;
  loading: boolean;
  error: string | null;
  invoiceNumber: string | null;
}

const initialState: PaymentState = {
  nominal: "",
  loading: false,
  error: null,
  invoiceNumber: null,
};

export const postPayment = createAsyncThunk<
  { invoice_number: string },
  TransactionData,
  { rejectValue: string; state: RootState }
>(
  "payment/postPayment",
  async (transactionData, { getState, rejectWithValue, dispatch }) => {
    const { balance } = getState().balance;

    if (balance < transactionData.total_amount) {
      return rejectWithValue("Saldo tidak mencukupi");
    }

    try {
      const invoice_number =
        "INV" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");

      const response = await api.post("/transaction", {
        ...transactionData,
        invoice_number,
        transaction_type: "PAYMENT",
      });

      dispatch(getBalance());
      return response.data;
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat pembayaran";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setNominal: (state, action: PayloadAction<string>) => {
      state.nominal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceNumber = action.payload.invoice_number;
      })
      .addCase(postPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNominal } = paymentSlice.actions;
export default paymentSlice.reducer;
