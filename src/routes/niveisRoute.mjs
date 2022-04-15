import { Router } from "express";
import { NivelController } from "../controllers/NivelController.mjs";

const niveisRoute = Router();

niveisRoute.get("/", NivelController.pegaTodosOsNiveis);
niveisRoute.get("/:id", NivelController.pegaUmNivel);
niveisRoute.post("/", NivelController.criaNivel);
niveisRoute.put("/:id", NivelController.atualizaNivel);
niveisRoute.delete("/:id", NivelController.apagaNivel);
niveisRoute.post("/:id/restaura", NivelController.restauraNivel);

export { niveisRoute };
