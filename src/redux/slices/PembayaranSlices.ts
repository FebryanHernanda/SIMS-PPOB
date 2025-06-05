import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  nominal: string;
}

const initialState: PaymentState = {
  nominal: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setNominal: (state, action: PayloadAction<string>) => {
      state.nominal = action.payload;
    },
  },
});

export const { setNominal } = paymentSlice.actions;
export default paymentSlice.reducer;
