import express from "express";
import {
  createPaleo,
  listPaleos,
  deletePaleo,
} from "../controllers/paleosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listPaleos);
router.post("/", authMiddleware, createPaleo);
router.delete("/:id", authMiddleware, deletePaleo);

export default router;
