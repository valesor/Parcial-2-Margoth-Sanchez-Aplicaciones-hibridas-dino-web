import express from "express";
import { body, param } from "express-validator"; // Validaciones
import authMiddleware from "../middlewares/authMiddleware.js"; // Middleware para proteger rutas
import {
  obtenerTodosDinosaurios,
  obtenerDinosaurioPorId,
  crearDinosaurio,
  actualizarDinosaurio,
  eliminarDinosaurio,
} from "../controllers/dinosaurioController.js";

const router = express.Router();

/**
 * @desc Obtener todos los dinosaurios
 * @route GET /api/dinosaurios
 * @access Público
 */
router.get("/", obtenerTodosDinosaurios);

/**
 * @desc Obtener un dinosaurio por ID
 * @route GET /api/dinosaurios/:id
 * @access Público
 */
router.get(
  "/:id",
  [
    param("id").isMongoId().withMessage("El ID proporcionado no es válido."), // Validación del parámetro
  ],
  obtenerDinosaurioPorId
);

/**
 * @desc Crear un dinosaurio
 * @route POST /api/dinosaurios
 * @access Privado (necesita autenticación)
 */
router.post(
  "/",
  authMiddleware, // Proteger la ruta
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
    body("era")
      .notEmpty()
      .withMessage("La era es obligatoria.")
      .isIn(["Mesozoica", "Cenozoica", "Paleozoica"])
      .withMessage(
        "La era debe ser válida (Mesozoica, Cenozoica o Paleozoica)."
      ),
    body("dieta")
      .notEmpty()
      .withMessage("La dieta es obligatoria.")
      .isIn(["herbívoro", "carnívoro", "omnívoro"])
      .withMessage("La dieta debe ser herbívoro, carnívoro o omnívoro."),
    body("tamano").isNumeric().withMessage("El tamaño debe ser un número."),
    body("paleontologo")
      .isMongoId()
      .withMessage("El paleontólogo debe ser un ID válido."),
    body("pais").isMongoId().withMessage("El país debe ser un ID válido."),
  ],
  crearDinosaurio
);

/**
 * @desc Actualizar un dinosaurio existente
 * @route PUT /api/dinosaurios/:id
 * @access Privado (necesita autenticación)
 */
router.put(
  "/:id",
  authMiddleware, // Proteger la ruta
  [
    param("id").isMongoId().withMessage("El ID proporcionado no es válido."),
    body("nombre")
      .optional()
      .isString()
      .withMessage("El nombre debe ser un texto válido."),
    body("tamano")
      .optional()
      .isNumeric()
      .withMessage("El tamaño debe ser un número."),
    body("dieta")
      .optional()
      .isIn(["herbívoro", "carnívoro", "omnívoro"])
      .withMessage("La dieta debe ser herbívoro, carnívoro o omnívoro."),
    body("era")
      .optional()
      .isIn(["Mesozoica", "Cenozoica", "Paleozoica"])
      .withMessage(
        "La era debe ser válida (Mesozoica, Cenozoica o Paleozoica)."
      ),
    body("paleontologo")
      .optional()
      .isMongoId()
      .withMessage("El paleontólogo debe ser un ID válido."),
    body("pais")
      .optional()
      .isMongoId()
      .withMessage("El país debe ser un ID válido."),
  ],
  actualizarDinosaurio
);

/**
 * @desc Eliminar un dinosaurio por ID
 * @route DELETE /api/dinosaurios/:id
 * @access Privado (necesita autenticación)
 */
router.delete(
  "/:id",
  authMiddleware,
  [
    param("id").isMongoId().withMessage("El ID proporcionado no es válido."), // Validación del parámetro
  ],
  eliminarDinosaurio
);

export default router;
