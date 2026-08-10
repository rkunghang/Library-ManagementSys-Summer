import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Genre } from "../models/genreModel.js";

export const addGenre = catchAsyncErrors(async (req, res, next) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return next(new ErrorHandler("Genre name is required", 400));
    }

    const existing = await Genre.findOne({ name: name.trim() });
    if (existing) {
        return next(new ErrorHandler("This genre already exists", 400));
    }

    const genre = await Genre.create({ name });
    res.status(201).json({ success: true, message: "Genre added successfully", genre });
});

export const getAllGenres = catchAsyncErrors(async (req, res, next) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.status(200).json({ success: true, genres });
});

export const updateGenre = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
        return next(new ErrorHandler("Genre name is required", 400));
    }

    const genre = await Genre.findById(id);
    if (!genre) {
        return next(new ErrorHandler("Genre not found", 404));
    }

    genre.name = name;
    await genre.save();

    res.status(200).json({ success: true, message: "Genre updated successfully", genre });
});

export const deleteGenre = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const genre = await Genre.findById(id);

    if (!genre) {
        return next(new ErrorHandler("Genre not found", 404));
    }

    await genre.deleteOne();
    res.status(200).json({ success: true, message: "Genre deleted successfully" });
});