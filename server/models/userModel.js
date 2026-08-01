import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        rerquired: true,
        select: false,

    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    accountVerified: { type: "boolean", default: false },
    borrowedBooks: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Borrow"
            },
            returned: {
                type: Boolean,
                default: false,

            },
            bookTitle: String,
            borrowedDate: Date,
            dueDate: Date,
        }
    ],
    avatar: {
        public_id: String,
        url: String,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);