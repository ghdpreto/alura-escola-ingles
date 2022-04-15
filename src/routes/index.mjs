import { Router } from "express";
import { niveisRoute } from "./niveisRoute.mjs";
//import { pessoasRoute } from "./pessoasRoute.mjs";
import { turmasRoute } from "./turmasRoute.mjs";
import { matriculasRoute } from "./matriculasRoute.mjs";

const routes = Router();

routes.get("/", (request, response) => {
  response.status(200).json("Up!");
});
//routes.use("/pessoas", pessoasRoute);
routes.use("/turmas", turmasRoute);
routes.use("/niveis", niveisRoute);
routes.use("/matriculas", matriculasRoute);

export { routes };
