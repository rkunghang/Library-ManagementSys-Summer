import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    biography: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export const Author = mongoose.model("Author", authorSchema);