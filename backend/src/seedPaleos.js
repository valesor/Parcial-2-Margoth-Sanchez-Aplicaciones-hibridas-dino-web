import Paleontologist from "./models/Paleontologist.js";

const famous = [
  { name: "Ricardo Fortosaurio" },
  { name: "Mirta Legrandopteryx" },
  { name: "Susana Velociraptoro" },
  { name: "Moria Casandrosaurus" },
  { name: "Marcelo Tinellisaurio" },
];

export const seedPaleos = async () => {
  try {
    const count = await Paleontologist.countDocuments();

    // Si ya hay paleontólogos cargados, no crea de nuevo
    if (count > 0) return;

    await Paleontologist.insertMany(famous);
    console.log("Paleontólogos iniciales creados correctamente");
  } catch (err) {
    console.error("Error sembrando paleontólogos:", err);
  }
};
