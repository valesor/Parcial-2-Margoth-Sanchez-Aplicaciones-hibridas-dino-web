import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas API y middleware
import routerAPI from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";

// Configuración de variables de entorno
dotenv.config();

// Variables globales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Validar variables de entorno
const validateEnv = () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI no está configurada en el archivo .env.");
    process.exit(1); // Salir con error
  }
  if (!PORT) {
    console.error("❌ PORT no está configurada en el archivo .env.");
    process.exit(1); // Salir con error
  }
};
validateEnv();

// Middlewares generales
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Permitir solicitudes solo desde el frontend si está configurado
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Permitir cookies si son necesarias
  })
);
app.use(express.json()); // Habilitar JSON en las solicitudes
app.use(express.urlencoded({ extended: false })); // Procesar datos en formato URL-encoded
app.use(express.static(path.join(__dirname, "public"))); // Servir archivos estáticos

// Cargar las rutas de la API
routerAPI(app);

// Ruta predeterminada de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Dinosaurios y Paleontólogos 🦖");
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada ❌" });
});

// Middleware global para manejo de errores personalizados
app.use(errorHandler);

// Conectar a MongoDB y levantar el servidor
const start = async () => {
  try {
    console.log("⏳ Conectando con MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conexión exitosa a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
      console.log(`🌐 API documentada en: http://localhost:${PORT}/api-docs`); // En caso de usar Swagger u otra doc
    });
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1); // Salir con error
  }
};

// Arrancar el servidor
start();
