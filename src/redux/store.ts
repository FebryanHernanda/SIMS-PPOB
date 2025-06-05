import { configureStore } from "@reduxjs/toolkit";
import topupReducer from "./slices/TopUpSlices";
import paymentReducer from "./slices/PembayaranSlices";
import dialogReducer from "./slices/DialogSlices";
import authReducer from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    topup: topupReducer,
    payment: paymentReducer,
    dialog: dialogReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
