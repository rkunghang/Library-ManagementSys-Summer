import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/register", data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const verifyOTP = createAsyncThunk(
    "auth/verifyOTP",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/verify-otp", data);
            toast.success(response.data.message);
            return response.data.user;
        } catch (error) {
            const message = error.response?.data?.message || "OTP verification failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", data);
            toast.success(response.data.message);
            return response.data.user;
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/logout");
            toast.success(response.data.message);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Logout failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/password/forgot", data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Request failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, ...data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/auth/password/reset/${token}`, data);
            toast.success(response.data.message);
            return response.data.user;
        } catch (error) {
            const message = error.response?.data?.message || "Reset failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/auth/password/update", data);
            toast.success(response.data.message);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Update failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// runs silently on every app load to check if a valid login cookie already exists — no toast here, a fresh visitor who was never logged in shouldn't see an "error"
export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/me");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        authChecked: false, // flips true once fetchUser resolves — Section 4's ProtectedRoute needs this so it doesn't redirect to /login while the session check is still in flight
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
            })

            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true; // OTP success logs the user straight in, since your backend sends a token cookie at this step too
            })
            .addCase(verifyOTP.rejected, (state) => {
                state.loading = false;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authChecked = true;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
                state.authChecked = true;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(forgotPassword.pending, (state) => { state.loading = true; })
            .addCase(forgotPassword.fulfilled, (state) => { state.loading = false; })
            .addCase(forgotPassword.rejected, (state) => { state.loading = false; })

            .addCase(resetPassword.pending, (state) => { state.loading = true; })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true; // your backend's resetPassword controller also calls sendToken, so this logs the user straight in
            })
            .addCase(resetPassword.rejected, (state) => { state.loading = false; })

            .addCase(updatePassword.pending, (state) => { state.loading = true; })
            .addCase(updatePassword.fulfilled, (state) => { state.loading = false; })
            .addCase(updatePassword.rejected, (state) => { state.loading = false; });
    },
});

export default authSlice.reducer;