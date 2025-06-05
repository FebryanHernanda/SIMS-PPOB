import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface dialogState {
  isModalOpen: boolean;
  isSuccessModal: boolean;
  isErrorModal: boolean;
  isLoading: boolean;
}

const initialState: dialogState = {
  isModalOpen: false,
  isSuccessModal: false,
  isErrorModal: false,
  isLoading: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },

    openSuccessModal(state) {
      state.isSuccessModal = true;
    },

    openErrorModal(state) {
      state.isErrorModal = true;
    },

    closeModal(state) {
      state.isModalOpen = false;
      state.isSuccessModal = false;
      state.isErrorModal = false;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  openModal,
  openSuccessModal,
  openErrorModal,
  closeModal,
} = dialogSlice.actions;

export default dialogSlice.reducer;
