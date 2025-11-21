import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import paleosRoutes from "./routes/paleosRoutes.js";
import dinosRoutes from "./routes/dinosRoutes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/paleos", paleosRoutes);
app.use("/api/dinos", dinosRoutes);

app.get("/", (req, res) => res.send("API Dinosaurs OK"));

export default app;
