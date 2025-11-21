import Dinosaur from "../models/Dinosaur.js";
import Joi from "joi";

// Permitimos que paleontologist sea ObjectId o string normal
const schema = Joi.object({
  name: Joi.string().required(),
  era: Joi.string().required(),
  diet: Joi.string().required(),
  description: Joi.string().allow(""),
  paleontologist: Joi.string().required(),
});

// Función para detectar si un string es un ObjectId válido
const isObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

export const createDino = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let paleo = req.body.paleontologist;

    // Si NO es ObjectId → lo dejamos como texto (fantasía)
    if (!isObjectId(paleo)) {
      paleo = { name: paleo, fantasy: true };
    }

    const dino = new Dinosaur({
      ...req.body,
      paleontologist: paleo,
      createdBy: req.user.id,
    });

    await dino.save();
    return res.status(201).json(dino);
  } catch (err) {
    console.error("Error al crear dino:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const listDinos = async (req, res) => {
  try {
    const dinos = await Dinosaur.find().populate("paleontologist");
    return res.json(dinos);
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const getDino = async (req, res) => {
  try {
    const dino = await Dinosaur.findById(req.params.id).populate(
      "paleontologist"
    );
    if (!dino) return res.status(404).json({ message: "No encontrado" });
    return res.json(dino);
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const updateDino = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let paleo = req.body.paleontologist;

    if (!isObjectId(paleo)) {
      paleo = { name: paleo, fantasy: true };
    }

    const dino = await Dinosaur.findByIdAndUpdate(
      req.params.id,
      { ...req.body, paleontologist: paleo },
      { new: true }
    );

    if (!dino) return res.status(404).json({ message: "No encontrado" });
    return res.json(dino);
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteDino = async (req, res) => {
  try {
    const dino = await Dinosaur.findByIdAndDelete(req.params.id);
    if (!dino) return res.status(404).json({ message: "No encontrado" });
    return res.json({ message: "Eliminado" });
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};
