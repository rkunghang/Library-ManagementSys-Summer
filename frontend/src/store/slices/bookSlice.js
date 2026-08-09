import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";

export const fetchBooks = createAsyncThunk(
    "book/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/book/all");
            return response.data.books;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load books");
        }
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default bookSlice.reducer;