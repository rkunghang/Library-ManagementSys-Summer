import express from "express";
import {
    recordBorrowBook,
    returnBorrowBook,
    borrowedBooks,
    getBorrowedByAdmin,
} from "../controllers/borrowController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowBook);
router.put("/return-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), returnBorrowBook);
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticated, isAuthorized("Admin"), getBorrowedByAdmin);

export default router;