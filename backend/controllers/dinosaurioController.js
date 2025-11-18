import Dinosaurio from "../models/Dinosaurio.js";
import Paleontologo from "../models/Paleontologo.js";
import Pais from "../models/Pais.js";

// Crear dinosaurio
export const crearDinosaurio = async (req, res) => {
  try {
    const { nombre, era, dieta, tamano, paleontologo, pais } = req.body;

    // Validaciones básicas
    if (!nombre || !era || !dieta || !tamano || !paleontologo || !pais) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Revisar si el paleontólogo existe
    const paleontologoExiste = await Paleontologo.findById(paleontologo);
    if (!paleontologoExiste) {
      return res.status(404).json({ message: "El paleontólogo no existe" });
    }

    // Verificar si el país existe
    const paisExiste = await Pais.findById(pais);
    if (!paisExiste) {
      return res.status(404).json({ message: "El país no existe" });
    }

    const nuevoDinosaurio = new Dinosaurio({
      nombre,
      era,
      dieta,
      tamano,
      paleontologo,
      pais,
    });

    const dinosaurioGuardado = await nuevoDinosaurio.save();

    // Actualizar descubrimientos del paleontólogo y dinosaurios del país
    await Paleontologo.findByIdAndUpdate(
      paleontologo,
      { $push: { descubrimientos: dinosaurioGuardado._id } },
      { new: true }
    );
    await Pais.findByIdAndUpdate(
      pais,
      { $push: { dinosauriosDescubiertos: dinosaurioGuardado._id } },
      { new: true }
    );

    res.status(201).json(dinosaurioGuardado);
  } catch (error) {
    console.error("Error al crear el dinosaurio:", error.message);
    res.status(500).json({ message: "Error al crear el dinosaurio", error });
  }
};

// Los demás métodos han sido ajustados ligeramente:
export const obtenerTodosDinosaurios = async (req, res) => {
  try {
    const dinosaurios = await Dinosaurio.find()
      .populate("paleontologo", "nombre nacionalidad")
      .populate("pais", "nombre codigo");
    res.status(200).json(dinosaurios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dinosaurios.", error });
  }
};

export const obtenerDinosaurioPorId = async (req, res) => {
  try {
    const dinosaurio = await Dinosaurio.findById(req.params.id)
      .populate("paleontologo", "nombre nacionalidad")
      .populate("pais", "nombre codigo");

    if (!dinosaurio) {
      return res.status(404).json({ message: "Dinosaurio no encontrado." });
    }

    res.status(200).json(dinosaurio);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dinosaurio.", error });
  }
};

export const actualizarDinosaurio = async (req, res) => {
  try {
    const { nombre, era, dieta, tamano, paleontologo, pais } = req.body;

    const dinosaurioActualizado = await Dinosaurio.findByIdAndUpdate(
      req.params.id,
      { nombre, era, dieta, tamano, paleontologo, pais },
      { new: true, runValidators: true }
    );

    if (!dinosaurioActualizado) {
      return res.status(404).json({ message: "Dinosaurio no encontrado." });
    }

    res.status(200).json(dinosaurioActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el dinosaurio.", error });
  }
};

export const eliminarDinosaurio = async (req, res) => {
  try {
    const dinosaurioEliminado = await Dinosaurio.findByIdAndDelete(
      req.params.id
    );

    if (!dinosaurioEliminado) {
      return res.status(404).json({ message: "Dinosaurio no encontrado." });
    }

    res.status(200).json({ message: "Dinosaurio eliminado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el dinosaurio.", error });
  }
};
