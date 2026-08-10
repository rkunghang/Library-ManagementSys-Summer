import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Author } from "../models/authorModel.js";

export const addAuthor = catchAsyncErrors(async (req, res, next) => {
    const { name, biography } = req.body;

    if (!name || !name.trim()) {
        return next(new ErrorHandler("Author name is required", 400));
    }

    const author = await Author.create({ name, biography });

    res.status(201).json({ success: true, message: "Author added successfully", author });
});

export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
    const authors = await Author.find().sort({ name: 1 });
    res.status(200).json({ success: true, authors });
});

export const updateAuthor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, biography } = req.body;

    if (!name || !name.trim()) {
        return next(new ErrorHandler("Author name is required", 400));
    }

    const author = await Author.findById(id);
    if (!author) {
        return next(new ErrorHandler("Author not found", 404));
    }

    author.name = name;
    author.biography = biography;
    await author.save();

    res.status(200).json({ success: true, message: "Author updated successfully", author });
});

export const deleteAuthor = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
        return next(new ErrorHandler("Author not found", 404));
    }

    await author.deleteOne();
    res.status(200).json({ success: true, message: "Author deleted successfully" });
});