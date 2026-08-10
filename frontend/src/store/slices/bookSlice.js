import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const fetchBooks = createAsyncThunk("book/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/book/all");
        return response.data.books;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to load books");
    }
});

export const fetchSingleBook = createAsyncThunk("book/fetchSingle", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/book/${id}`);
        return response.data.book;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to load book");
    }
});

export const addBook = createAsyncThunk("book/add", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/book/admin/add", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(response.data.message);
        return response.data.book;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add book";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const editBook = createAsyncThunk("book/edit", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/book/admin/edit/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(response.data.message);
        return response.data.book;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update book";
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const deleteBook = createAsyncThunk("book/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/book/delete/${id}`);
        toast.success(response.data.message);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete book";
        toast.error(message);
        return rejectWithValue(message);
    }
});

const bookSlice = createSlice({
    name: "book",
    initialState: { books: [], activeBook: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => { state.loading = true; })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state) => { state.loading = false; })
            .addCase(fetchSingleBook.pending, (state) => { state.loading = true; })
            .addCase(fetchSingleBook.fulfilled, (state, action) => {
                state.loading = false;
                state.activeBook = action.payload;
            })
            .addCase(fetchSingleBook.rejected, (state) => { state.loading = false; })
            .addCase(addBook.fulfilled, (state, action) => { state.books.unshift(action.payload); })
            .addCase(editBook.fulfilled, (state, action) => {
                const i = state.books.findIndex((b) => b._id === action.payload._id);
                if (i !== -1) state.books[i] = action.payload;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((book) => book._id !== action.payload);
            });
    },
});

export default bookSlice.reducer;