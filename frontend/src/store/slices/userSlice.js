import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const fetchAllUsers = createAsyncThunk(
    "user/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/all");
            return response.data.users;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load users");
        }
    }
);

export const registerNewAdmin = createAsyncThunk(
    "user/registerAdmin",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/add/new-admin", formData, {
                headers: { "Content-Type": "multipart/form-data" }, // required so express-fileupload on the backend actually receives the avatar as a file, not a plain field
            });
            toast.success(response.data.message);
            return response.data.admin;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to register admin";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.loading = false;
            })
            .addCase(registerNewAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerNewAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.users.unshift(action.payload);
            })
            .addCase(registerNewAdmin.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default userSlice.reducer;