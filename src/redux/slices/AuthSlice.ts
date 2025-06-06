import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AxiosError } from "axios";

export interface LoginInput {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: File | null;
}

interface authState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
}

const initialState: authState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", data);
      localStorage.setItem("token", response.data.data.token);
      return {
        token: response.data.token,
        message: response.data.message,
      };
    } catch (err: unknown) {
      let errorMessage = "Login gagal";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: RegisterInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/registration", data);
      localStorage.setItem("token", response.data.token);
      return {
        message: response.data.message,
      };
    } catch (err: unknown) {
      let errorMessage = "Register gagal";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/profile");
      return res.data.data;
    } catch (err: unknown) {
      let errorMessage = "Gagal mengambil data profile";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await api.put("/profile/update", data);
      return {
        user: res.data.data,
        message: res.data.message,
      };
    } catch (err: unknown) {
      let errorMessage = "Gagal melakukan update data profile";

      if (err && typeof err === "object" && "isAxiosError" in err) {
        const axiosError = err as AxiosError<{ message: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.successMessage = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, clearAuthState, clearMessages } = authSlice.actions;
export default authSlice.reducer;
