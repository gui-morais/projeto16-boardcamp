import express from "express";
import { getCategories } from "../controllers/getCategories.js";
import { postCategorie } from "../controllers/postCategorie.js";
import { validateNewCategorie } from "../middlewares/validateNewCategorie.js";

const router = express.Router();
router.post("/categories", validateNewCategorie, postCategorie);
router.get("/categories", getCategories);

export default router;