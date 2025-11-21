import express from "express";
import {
  createDino,
  listDinos,
  getDino,
  updateDino,
  deleteDino,
} from "../controllers/dinosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Listo  dinosaurios
router.get("/", listDinos);

// Obtengo dino por ID
router.get("/:id", getDino);

// Creao dinosaurio
router.post("/", authMiddleware, createDino);

// Editar dinosaurio
router.put("/:id", authMiddleware, updateDino);

// Eliminaa dinosaurio
router.delete("/:id", authMiddleware, deleteDino);

export default router;
