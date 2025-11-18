import express from "express";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js"; // Protección con JWT
import {
  obtenerTodosPaleontologos,
  obtenerPaleontologoPorId,
  crearPaleontologo,
  eliminarPaleontologo,
} from "../controllers/paleontologoController.js";

const router = express.Router();

// Obtener todos los paleontólogos
router.get("/", obtenerTodosPaleontologos);

// Obtener un paleontólogo por su ID
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("El ID proporcionado no es válido.")],
  obtenerPaleontologoPorId
);

// Crear un paleontólogo (protegido)
router.post(
  "/",
  authMiddleware,
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
    body("nacionalidad")
      .notEmpty()
      .withMessage("La nacionalidad es obligatoria."),
  ],
  crearPaleontologo
);

// Eliminar un paleontólogo por su ID (protegido)
router.delete(
  "/:id",
  authMiddleware,
  [param("id").isMongoId().withMessage("El ID proporcionado no es válido.")],
  eliminarPaleontologo
);

export default router;
