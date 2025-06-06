import { configureStore } from "@reduxjs/toolkit";
import topupReducer from "./slices/TopUpSlices";
import paymentReducer from "./slices/PembayaranSlices";
import dialogReducer from "./slices/DialogSlices";
import authReducer from "./slices/AuthSlice";
import informationReducer from "./slices/InformationSlices";
import getBalance from "./slices/BalanceSlice";
import getTransactionsHistory from "./slices/TransactionHistoryslice";

export const store = configureStore({
  reducer: {
    topup: topupReducer,
    payment: paymentReducer,
    dialog: dialogReducer,
    auth: authReducer,
    information: informationReducer,
    balance: getBalance,
    transactionHistory: getTransactionsHistory,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
