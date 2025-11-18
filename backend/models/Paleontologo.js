import mongoose from "mongoose";

const PaleontologoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  nacionalidad: {
    type: String,
    required: true,
    maxlength: 50,
  },
  descubrimientos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dinosaurio", // Relación con Dinosaurio
    },
  ],
});

const Paleontologo = mongoose.model("Paleontologo", PaleontologoSchema);

export default Paleontologo;
