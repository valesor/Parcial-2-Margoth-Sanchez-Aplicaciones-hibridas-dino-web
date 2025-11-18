import mongoose from "mongoose";

const DinosaurioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  era: {
    type: String,
    required: true,
    enum: ["Mesozoica", "Cenozoica", "Paleozoica"], // Opcional: eras específicas
  },
  dieta: {
    type: String,
    required: true,
    enum: ["herbívoro", "carnívoro", "omnívoro"], // Asegura valores válidos
  },
  tamano: {
    type: Number,
    required: true,
    min: 0,
  },
  paleontologo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paleontologo", // Relación con modelo Paleontologo
    required: true,
  },
  pais: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pais", // Relación con modelo Pais
    required: true,
  },
});

const Dinosaurio = mongoose.model("Dinosaurio", DinosaurioSchema);

export default Dinosaurio;
