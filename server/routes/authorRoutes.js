import express from "express";
import { addAuthor, getAllAuthors, updateAuthor, deleteAuthor } from "../controllers/authorController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addAuthor);
router.get("/all", isAuthenticated, getAllAuthors);
router.put("/admin/update/:id", isAuthenticated, isAuthorized("Admin"), updateAuthor);
router.delete("/admin/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteAuthor);

export default router;