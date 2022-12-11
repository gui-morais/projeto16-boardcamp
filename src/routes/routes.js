import express from "express";
import { getCategories } from "../controllers/categories/getCategories.js";
import { postCategory } from "../controllers/categories/postCategory.js";
import { getGames } from "../controllers/games/getGames.js";
import { postGame } from "../controllers/games/postGame.js";
import { validateNewCategory } from "../middlewares/validateNewCategory.js";
import { validateNewGame } from "../middlewares/validateNewGame.js";

const router = express.Router();
router.post("/categories", validateNewCategory, postCategory);
router.get("/categories", getCategories);
router.post("/games", validateNewGame, postGame);
router.get("/games", getGames);

export default router;