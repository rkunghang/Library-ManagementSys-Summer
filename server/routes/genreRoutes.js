import express from "express";
import { addGenre, getAllGenres, updateGenre, deleteGenre } from "../controllers/genreController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addGenre);
router.get("/all", isAuthenticated, getAllGenres);
router.put("/admin/update/:id", isAuthenticated, isAuthorized("Admin"), updateGenre);
router.delete("/admin/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteGenre);

export default router;