import Paleontologo from "../models/Paleontologo.js";

// Obtener todos los paleontólogos
export const obtenerTodosPaleontologos = async (req, res) => {
  try {
    const paleontologos = await Paleontologo.find().populate(
      "descubrimientos",
      "nombre era dieta"
    );
    res.status(200).json(paleontologos);
  } catch (error) {
    console.error("Error al obtener paleontólogos:", error.message);
    res.status(500).json({ message: "Error al obtener paleontólogos", error });
  }
};

// Obtener un paleontólogo por ID
export const obtenerPaleontologoPorId = async (req, res) => {
  try {
    const paleontologo = await Paleontologo.findById(req.params.id).populate(
      "descubrimientos",
      "nombre era dieta"
    );

    if (!paleontologo) {
      return res.status(404).json({ message: "Paleontólogo no encontrado" });
    }

    res.status(200).json(paleontologo);
  } catch (error) {
    console.error("Error al obtener el paleontólogo:", error.message);
    res.status(500).json({ message: "Error al obtener paleontólogo", error });
  }
};

// Crear un nuevo paleontólogo
export const crearPaleontologo = async (req, res) => {
  try {
    const { nombre, nacionalidad } = req.body;

    const nuevoPaleontologo = new Paleontologo({
      nombre,
      nacionalidad,
    });

    const paleontologoGuardado = await nuevoPaleontologo.save();
    res.status(201).json(paleontologoGuardado);
  } catch (error) {
    console.error("Error al crear el paleontólogo:", error.message);
    res.status(500).json({ message: "Error al crear paleontólogo", error });
  }
};

// Eliminar paleontólogo
export const eliminarPaleontologo = async (req, res) => {
  try {
    const paleontologoEliminado = await Paleontologo.findByIdAndDelete(
      req.params.id
    );
    if (!paleontologoEliminado) {
      return res.status(404).json({ message: "Paleontólogo no encontrado" });
    }
    res.status(200).json({ message: "Paleontólogo eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el paleontólogo:", error.message);
    res.status(500).json({ message: "Error al eliminar paleontólogo", error });
  }
};
