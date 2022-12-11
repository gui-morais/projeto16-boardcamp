import express from "express";
import { postCategorie } from "../controllers/postCategorie.js";
import { validateNewCategorie } from "../middlewares/validateNewCategorie.js";

const router = express.Router();
router.post("/categories", validateNewCategorie, postCategorie);

export default router;