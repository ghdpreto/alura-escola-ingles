import { Router } from "express";
import { TurmaController } from "../controllers/TurmaController.mjs";


const turmasRoute = Router()

turmasRoute.get('/', TurmaController.pegaTodasAsTurmas)
turmasRoute.get('/:id', TurmaController.pegaUmaTurma)
turmasRoute.post('/', TurmaController.criaTurma)
turmasRoute.put('/:id', TurmaController.atualizaTurma)
turmasRoute.delete('/:id', TurmaController.apagaTurma)
turmasRoute.post('/:id/restaura', TurmaController.restauraTurma)


export { turmasRoute }