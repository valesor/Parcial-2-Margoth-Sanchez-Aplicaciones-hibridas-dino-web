import mongoose from "mongoose";

// Definición del esquema para Países
const PaisSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del país es obligatorio"],
    trim: true, // Elimina los espacios en blanco al inicio y final
    unique: true, // Impide que haya países duplicados
    maxlength: [100, "El nombre del país no puede exceder los 100 caracteres"],
  },
  codigo: {
    type: String,
    required: [true, "El código del país es obligatorio"],
    trim: true,
    unique: true, // Impide que los códigos sean duplicados
    maxlength: [5, "El código del país no puede exceder los 5 caracteres"], // Ejemplo: "ARG", "USA"
  },
  dinosauriosDescubiertos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dinosaurio", // Relación con el modelo Dinosaurio
    },
  ],
});

// Índices únicos para asegurar consistencia en la base de datos
PaisSchema.index({ nombre: 1 }, { unique: true });
PaisSchema.index({ codigo: 1 }, { unique: true });

// Crear el modelo basado en el esquema
const Pais = mongoose.model("Pais", PaisSchema);

export default Pais;
