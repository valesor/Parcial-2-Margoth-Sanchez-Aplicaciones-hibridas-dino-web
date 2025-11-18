import express from "express";
import { body, param } from "express-validator"; // Validaciones
import authMiddleware from "../middlewares/authMiddleware.js"; // Middleware de autenticación
import {
  crearPais,
  obtenerTodosPaises,
  actualizarPais,
  eliminarPais,
} from "../controllers/paisController.js"; // Controladores

const router = express.Router();

/**
 * @route GET /api/paises
 * @desc Obtener todos los países
 * @access Público
 */
router.get("/", obtenerTodosPaises);

/**
 * @route POST /api/paises
 * @desc Crear un país
 * @access Privado
 * @middleware authMiddleware
 */
router.post(
  "/",
  authMiddleware, // Proteger ruta
  [
    body("nombre").notEmpty().withMessage("El nombre del país es obligatorio."),
    body("codigo")
      .notEmpty()
      .isString()
      .withMessage("El código del país debe ser un texto válido."),
  ],
  crearPais
);

/**
 * @route PUT /api/paises/:id
 * @desc Actualizar un país
 * @access Privado
 * @middleware authMiddleware
 */
router.put(
  "/:id",
  authMiddleware, // Proteger ruta
  [
    param("id").isMongoId().withMessage("El ID proporcionado no es válido."),
    body("nombre")
      .optional()
      .isString()
      .withMessage("El nombre debe ser un texto válido."),
    body("codigo")
      .optional()
      .isString()
      .withMessage("El código debe ser un texto válido."),
  ],
  actualizarPais
);

/**
 * @route DELETE /api/paises/:id
 * @desc Eliminar un país
 * @access Privado
 * @middleware authMiddleware
 */
router.delete(
  "/:id",
  authMiddleware, // Proteger ruta
  [param("id").isMongoId().withMessage("El ID proporcionado no es válido.")],
  eliminarPais
);

export default router;
