import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import bookReducer from "./slices/bookSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        book: bookReducer,
    },
});