import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: String,
        email: String,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    bookTitle: String,
    price: Number, // snapshot of the book's price at borrow time, used if the book is never returned
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        default: null, // stays null until returnBorrowBook fills it in — this is how we know it's still out
    },
    fine: {
        type: Number,
        default: 0,
    },
    notified: {
        type: Boolean,
        default: false, // flips true once notifyUsers.js (step 10) has already emailed a due-date reminder
    },
}, {
    timestamps: true,
});

export const Borrow = mongoose.model("Borrow", borrowSchema);