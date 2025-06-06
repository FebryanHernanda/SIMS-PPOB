import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AxiosError } from "axios";

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface Services {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}
interface informationState {
  banners: Banner[];
  services: Services[];
  loading: boolean;
  error: string | null;
}

const initialState: informationState = {
  banners: [],
  services: [],
  loading: false,
  error: null,
};

export const getBanners = createAsyncThunk(
  "banners/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/banner");
      return response.data.data;
    } catch (err) {
      let errorMessage = "gagal mengambil data banner";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/services");
      return response.data.data;
    } catch (err) {
      let errorMessage = "gagal mengambil data services";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default informationSlice.reducer;
