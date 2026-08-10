import express from "express";
import { addBook, editBook, getAllBooks, getSingleBook, deleteBook } from "../controllers/bookController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook);
router.put("/admin/edit/:id", isAuthenticated, isAuthorized("Admin"), editBook);
router.get("/all", isAuthenticated, getAllBooks);
router.get("/:id", isAuthenticated, getSingleBook); // must stay AFTER /all, or Express treats "all" as an :id
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook);

export default router;