import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Book } from "../models/bookModel.js";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // book id
    const { email } = req.body;

    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    const user = await User.findOne({ email, accountVerified: true });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (book.availableCopies === 0) {
        return next(new ErrorHandler("Book is not available right now", 400)); // no stock left, block the borrow
    }

    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b) => b.bookId.toString() === id && b.returned === false
    );

    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("Book already borrowed by this user", 400));
    }

    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // due 7 days from now

    book.availableCopies -= 1; // one less copy in circulation
    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedDate: new Date(),
        dueDate,
    });
    await user.save();

    await Borrow.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        book: book._id,
        bookTitle: book.title,
        price: book.price,
        dueDate,
    });

    res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
    });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // book id
    const { email } = req.body;

    const book = await Book.findById(id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    const user = await User.findOne({ email, accountVerified: true });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const borrowedBookEntry = user.borrowedBooks.find(
        (b) => b.bookId.toString() === id && b.returned === false
    );

    if (!borrowedBookEntry) {
        return next(new ErrorHandler("Book was not borrowed by this user", 400));
    }

    const borrow = await Borrow.findOne({
        book: id,
        "user.email": email,
        returnDate: null, // the still-open borrow record for this book/user pair
    });

    if (!borrow) {
        return next(new ErrorHandler("Borrow record not found", 404));
    }

    const fine = calculateFine(borrow.dueDate); // this is the core payoff of the whole borrow/due-date flow

    borrowedBookEntry.returned = true;
    await user.save();

    book.availableCopies += 1; // copy goes back into stock
    await book.save();

    borrow.returnDate = new Date();
    borrow.fine = fine;
    await borrow.save();

    res.status(200).json({
        success: true,
        message:
            fine !== 0
                ? `Book returned successfully. Total fine is ${fine}`
                : "Book returned successfully",
    });
});

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const { borrowedBooks } = req.user; // req.user was attached by isAuthenticated

    res.status(200).json({
        success: true,
        borrowedBooks,
    });
});

export const getBorrowedByAdmin = catchAsyncErrors(async (req, res, next) => {
    const borrowedBooks = await Borrow.find(); // full borrow history, every user — admin-only view

    res.status(200).json({
        success: true,
        borrowedBooks,
    });
});