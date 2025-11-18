import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware para proteger rutas privadas
const authMiddleware = async (req, res, next) => {
  let token;

  // Verificar si el header tiene token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraer token (elimina el prefijo "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        return res
          .status(500)
          .json({ message: "Error del servidor: JWT_SECRET no configurado" });
      }

      // Verificar el token con JWT y obtener los datos decodificados
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario basado en el ID del token y excluir el campo contraseña
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(404)
          .json({ message: "El usuario asociado al token no existe" });
      }

      // Continuar al siguiente middleware/controlador
      next();
    } catch (error) {
      console.error("Error al verificar el token:", error.message);

      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({
            message: "El token ha expirado. Por favor, inicia sesión de nuevo.",
          });
      }

      return res
        .status(401)
        .json({ message: "Token no válido o corrupto. Acceso denegado." });
    }
  } else {
    // No hay token en los headers
    return res.status(401).json({
      message:
        "No se proporcionó un token de acceso. Asegúrate de enviar un token en el header Authorization.",
    });
  }
};

export default authMiddleware;
