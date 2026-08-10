import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const fetchAuthors = createAsyncThunk("author/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/author/all");
        return response.data.authors;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to load authors");
    }
});

export const addAuthor = createAsyncThunk("author/add", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/author/admin/add", data);
        toast.success(response.data.message);
        return response.data.author;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add author";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const updateAuthor = createAsyncThunk("author/update", async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/author/admin/update/${id}`, data);
        toast.success(response.data.message);
        return response.data.author;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update author";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const deleteAuthor = createAsyncThunk("author/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/author/admin/delete/${id}`);
        toast.success(response.data.message);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete author";
        toast.error(message);
        return rejectWithValue(message);
    }
});

const authorSlice = createSlice({
    name: "author",
    initialState: { authors: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => { state.loading = true; })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state) => { state.loading = false; })
            .addCase(addAuthor.fulfilled, (state, action) => { state.authors.push(action.payload); })
            .addCase(updateAuthor.fulfilled, (state, action) => {
                const i = state.authors.findIndex((a) => a._id === action.payload._id);
                if (i !== -1) state.authors[i] = action.payload;
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                state.authors = state.authors.filter((a) => a._id !== action.payload);
            });
    },
});

export default authorSlice.reducer;