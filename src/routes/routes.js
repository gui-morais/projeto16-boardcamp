import express from "express";
import { getCategories } from "../controllers/categories/getCategories.js";
import { postCategory } from "../controllers/categories/postCategory.js";
import { getClient } from "../controllers/clients/getClient.js";
import { getClients } from "../controllers/clients/getClients.js";
import { postClient } from "../controllers/clients/postClient.js";
import { putClient } from "../controllers/clients/putClient.js";
import { getGames } from "../controllers/games/getGames.js";
import { postGame } from "../controllers/games/postGame.js";
import { validateNewCategory } from "../middlewares/validateNewCategory.js";
import { validateNewClient } from "../middlewares/validateNewClient.js";
import { validateNewGame } from "../middlewares/validateNewGame.js";
import { validateUpdateClient } from "../middlewares/validateUpdateClient.js";

const router = express.Router();
router.post("/categories", validateNewCategory, postCategory);
router.get("/categories", getCategories);
router.post("/games", validateNewGame, postGame);
router.get("/games", getGames);
router.post("/customers", validateNewClient, postClient);
router.get("/customers", getClients);
router.get("/customers/:id", getClient);
router.put("/customers/:id", validateUpdateClient, putClient);

export default router;