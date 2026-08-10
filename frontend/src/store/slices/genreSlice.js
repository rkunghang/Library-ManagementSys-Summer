import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const fetchGenres = createAsyncThunk("genre/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/genre/all");
        return response.data.genres;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to load genres");
    }
});

export const addGenre = createAsyncThunk("genre/add", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/genre/admin/add", data);
        toast.success(response.data.message);
        return response.data.genre;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add genre";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const updateGenre = createAsyncThunk("genre/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/genre/admin/update/${id}`, data);
        toast.success(response.data.message);
        return response.data.genre;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update genre";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const deleteGenre = createAsyncThunk("genre/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/genre/admin/delete/${id}`);
        toast.success(response.data.message);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete genre";
        toast.error(message);
        return rejectWithValue(message);
    }
});

const genreSlice = createSlice({
    name: "genre",
    initialState: { genres: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => { state.loading = true; })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state) => { state.loading = false; })
            .addCase(addGenre.fulfilled, (state, action) => { state.genres.push(action.payload); })
            .addCase(updateGenre.fulfilled, (state, action) => {
                const i = state.genres.findIndex((g) => g._id === action.payload._id);
                if (i !== -1) state.genres[i] = action.payload;
            })
            .addCase(deleteGenre.fulfilled, (state, action) => {
                state.genres = state.genres.filter((g) => g._id !== action.payload);
            });
    },
});

export default genreSlice.reducer;