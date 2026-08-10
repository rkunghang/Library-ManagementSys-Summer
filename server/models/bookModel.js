import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Stock quantity cannot be negative"], // schema-level backstop for the validation requirement
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
    },
    coverImage: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
}, {
    timestamps: true,
});

export const Book = mongoose.model("Book", bookSchema);