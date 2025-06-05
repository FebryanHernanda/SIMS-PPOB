// state managemetn
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TopupState {
  nominal: string;
}

const initialState: TopupState = {
  nominal: "",
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    setNominal: (state, action: PayloadAction<string>) => {
      state.nominal = action.payload;
    },
  },
});

export const { setNominal } = topupSlice.actions;
export default topupSlice.reducer;
