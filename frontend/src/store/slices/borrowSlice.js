import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const recordBorrow = createAsyncThunk(
    "borrow/record",
    async ({ bookId, email }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/borrow/record-borrow-book/${bookId}`, { email });
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to record borrow";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const returnBorrow = createAsyncThunk(
    "borrow/return",
    async ({ bookId, email }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/borrow/return-borrow-book/${bookId}`, { email });
            toast.success(response.data.message);
            return bookId;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to return book";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const fetchMyBorrowedBooks = createAsyncThunk(
    "borrow/fetchMine",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/borrow/my-borrowed-books");
            return response.data.borrowedBooks;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load your books");
        }
    }
);

export const fetchAllBorrowRecords = createAsyncThunk(
    "borrow/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/borrow/borrowed-books-by-users");
            return response.data.borrowedBooks;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load borrow records");
        }
    }
);

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        myBorrowedBooks: [],
        allBorrowRecords: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBorrowedBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyBorrowedBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.myBorrowedBooks = action.payload;
            })
            .addCase(fetchMyBorrowedBooks.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAllBorrowRecords.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllBorrowRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.allBorrowRecords = action.payload;
            })
            .addCase(fetchAllBorrowRecords.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default borrowSlice.reducer;