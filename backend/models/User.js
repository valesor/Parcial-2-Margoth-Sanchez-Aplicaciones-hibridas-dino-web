import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Crear el esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El nombre del usuario es obligatorio
    trim: true, // Elimina espacios en blanco innecesarios
  },
  email: {
    type: String,
    required: true, // El correo es obligatorio
    unique: true, // El correo debe ser único
    trim: true,
    lowercase: true, // Convertir a minúsculas
  },
  password: {
    type: String,
    required: true, // La contraseña es obligatoria
    minlength: 6, // La contraseña debe tener al menos 6 caracteres
  },
});

// Middleware de Mongoose para hash de contraseñas
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si no cambió la contraseña, sigue

  console.log("🔒 Hasheando contraseña para el usuario:", this.email);
  const salt = await bcrypt.genSalt(10); // Genera un "salt" para el hash
  this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña
  next();
});

// Crear el modelo de usuario (compilado del esquema)
const User = mongoose.model("User", userSchema);

export default User;
