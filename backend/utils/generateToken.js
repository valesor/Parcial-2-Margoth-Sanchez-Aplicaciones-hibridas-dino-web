import jwt from "jsonwebtoken";

const generateToken = (id, expiresIn = "7d") => {
  // Verificar la existencia de JWT_SECRET
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado en el archivo .env");
  }

  // Generar el token con el ID proporcionado
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

export default generateToken;
