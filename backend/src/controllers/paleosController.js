import Paleontologist from "../models/Paleontologist.js";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().allow(""),
  specialty: Joi.string().allow(""),
});

// Crear
export const createPaleo = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const paleo = new Paleontologist(req.body);
    await paleo.save();
    return res.status(201).json(paleo);
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

// Lista Paleontólogos
export const listPaleos = async (req, res) => {
  try {
    const paleos = await Paleontologist.find();
    return res.json(paleos);
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

//ELIMINAR PALEONTÓLOGO
export const deletePaleo = async (req, res) => {
  try {
    const paleo = await Paleontologist.findByIdAndDelete(req.params.id);

    if (!paleo) {
      return res.status(404).json({ message: "Paleontólogo no encontrado" });
    }

    return res.json({ message: "Paleontólogo eliminado" });
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};
