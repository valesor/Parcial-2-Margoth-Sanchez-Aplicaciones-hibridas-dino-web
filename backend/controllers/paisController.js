import Pais from "../models/Pais.js"; // Modelo de País

// Obtener todos los países
export const obtenerTodosPaises = async (req, res) => {
  try {
    const paises = await Pais.find().populate(
      "dinosauriosDescubiertos",
      "nombre"
    );
    res.status(200).json(paises);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los países.", error });
  }
};

// Crear un país
export const crearPais = async (req, res) => {
  try {
    const { nombre, codigo } = req.body;

    const nuevoPais = new Pais({ nombre, codigo });
    await nuevoPais.save();

    res
      .status(201)
      .json({ message: "País creado exitosamente.", pais: nuevoPais });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el país.", error });
  }
};

// Actualizar un país
export const actualizarPais = async (req, res) => {
  try {
    const { nombre, codigo } = req.body;

    const paisActualizado = await Pais.findByIdAndUpdate(
      req.params.id,
      { nombre, codigo },
      { new: true, runValidators: true }
    );

    if (!paisActualizado) {
      return res.status(404).json({ message: "País no encontrado." });
    }

    res
      .status(200)
      .json({
        message: "País actualizado exitosamente.",
        pais: paisActualizado,
      });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el país.", error });
  }
};

// Eliminar un país
export const eliminarPais = async (req, res) => {
  try {
    const paisEliminado = await Pais.findByIdAndDelete(req.params.id);

    if (!paisEliminado) {
      return res.status(404).json({ message: "País no encontrado." });
    }

    res.status(200).json({ message: "País eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el país.", error });
  }
};
