console.log("Users router cargado:", usersRouter);

import dinosauriosRouter from "./dinosaurios.js";
import paleontologosRouter from "./paleontologos.js";
import paisesRouter from "./paises.js";
import usersRouter from "./users.js";

/**
 * @desc Registrar todas las rutas API
 * @param {Object} app - Instancia de Express
 */
const routerAPI = (app) => {
  console.log("Registrando rutas de la API...");

  app.use("/api/dinosaurios", dinosauriosRouter);
  app.use("/api/paleontologos", paleontologosRouter);
  app.use("/api/paises", paisesRouter);
  app.use("/api/users", usersRouter); // Rutas de usuarios
};

export default routerAPI;
