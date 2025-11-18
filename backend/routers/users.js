console.log("Users.js cargado correctamente");
import express from "express";
import { body } from "express-validator"; // Validaciones
import { register } from "../controllers/userController.js"; // Controlador de usuario

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Registrar un nuevo usuario
 * @access Público
 */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio."),
    body("email").isEmail().withMessage("Formato de email inválido."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres."),
  ],
  register
);

export default router;
