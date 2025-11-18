import User from "../models/User.js"; // Modelo de Usuario
import { validationResult } from "express-validator"; // Validaciones
import bcrypt from "bcrypt"; // Encriptar contraseñas

/**
 * @desc Registrar un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "El usuario ya está registrado." });
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      name,
      email,
      password: password,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error interno del servidor:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
