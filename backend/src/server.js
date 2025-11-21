import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import { seedPaleos } from "./seedPaleos.js";

dotenv.config();

const startServer = async () => {
  await connectDB();
  await seedPaleos(); // <-- CREA PALEONTÓLOGOS AUTOMÁTICOS

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();
