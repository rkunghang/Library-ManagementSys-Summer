import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import bookReducer from "./slices/bookSlice.js";
import borrowReducer from "./slices/borrowSlice.js";
import userReducer from "./slices/userSlice.js";
import authorReducer from "./slices/authorSlice.js";
import genreReducer from "./slices/genreSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
        borrow: borrowReducer,
        user: userReducer,
        author: authorReducer,
        genre: genreReducer,
    },
});