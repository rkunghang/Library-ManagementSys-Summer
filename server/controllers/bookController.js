import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Book } from "../models/bookModel.js";
import cloudinary from "cloudinary";

export const addBook = catchAsyncErrors(async (req, res, next) => {
    const { title, author, genre, description, price, quantity } = req.body;

    if (!title || !author || !genre || quantity === undefined || quantity === "") {
        return next(new ErrorHandler("Please enter all required fields", 400));
    }

    if (Number(quantity) < 0) {
        return next(new ErrorHandler("Stock quantity cannot be negative", 400));
    }

    if (!req.files || !req.files.coverImage) {
        return next(new ErrorHandler("Cover image is required", 400));
    }

    const { coverImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(coverImage.mimetype)) {
        return next(new ErrorHandler("Cover image must be png, jpeg, or webp", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(coverImage.tempFilePath, {
        folder: "LIBRARY_MANAGEMENT_SYSTEM_BOOK_COVERS",
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Failed to upload cover image", 500));
    }

    const book = await Book.create({
        title,
        author,
        genre,
        description,
        price: price || 0,
        quantity: Number(quantity),
        availableCopies: Number(quantity),
        coverImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    const populatedBook = await book.populate(["author", "genre"]);

    res.status(201).json({ success: true, message: "Book added successfully", book: populatedBook });
});

export const editBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, genre, description, price, quantity } = req.body;

    const book = await Book.findById(id);
    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    if (!title || !author || !genre || quantity === undefined || quantity === "") {
        return next(new ErrorHandler("Please enter all required fields", 400));
    }

    if (Number(quantity) < 0) {
        return next(new ErrorHandler("Stock quantity cannot be negative", 400));
    }

    const borrowedCount = book.quantity - book.availableCopies; // copies currently out with borrowers — must be preserved when stock changes
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.description = description;
    book.price = price || 0;
    book.quantity = Number(quantity);
    book.availableCopies = Math.max(Number(quantity) - borrowedCount, 0);

    if (req.files && req.files.coverImage) {
        const { coverImage } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedFormats.includes(coverImage.mimetype)) {
            return next(new ErrorHandler("Cover image must be png, jpeg, or webp", 400));
        }

        if (book.coverImage?.public_id) {
            await cloudinary.uploader.destroy(book.coverImage.public_id); // clean up the old image so Cloudinary doesn't accumulate orphans
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(coverImage.tempFilePath, {
            folder: "LIBRARY_MANAGEMENT_SYSTEM_BOOK_COVERS",
        });

        book.coverImage = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    await book.save();
    const populatedBook = await book.populate(["author", "genre"]);

    res.status(200).json({ success: true, message: "Book updated successfully", book: populatedBook });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find().populate(["author", "genre"]).sort({ createdAt: -1 });
    res.status(200).json({ success: true, books });
});

export const getSingleBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate(["author", "genre"]);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({ success: true, book });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    if (book.coverImage?.public_id) {
        await cloudinary.uploader.destroy(book.coverImage.public_id);
    }

    await book.deleteOne();
    res.status(200).json({ success: true, message: "Book deleted successfully" });
});