import { Router } from "express";
import { MatriculaController } from "../controllers/MatriculaController.mjs";

const matriculasRoute = Router();

matriculasRoute.get(
  "/:turmaId/confirmadas",
  MatriculaController.pegaMatriculasPorTurma
);
matriculasRoute.get("/lotada", MatriculaController.pegaTurmasLotadas);
matriculasRoute.get(
  "/:matriculaId/estudante/:estudanteId",
  MatriculaController.pegaUmaMatricula
);
matriculasRoute.post("/:estudanteId", MatriculaController.criaMatricula);
matriculasRoute.put(
  "/:matriculaId/estudante/:estudanteId",
  MatriculaController.atualizaMatricula
);
matriculasRoute.delete(
  "/:matriculaId/estudante/:estudanteId",
  MatriculaController.apagaMatricula
);
matriculasRoute.post(
  "/:matriculaId/estudante/:estudanteId/restaura",
  MatriculaController.restauraMatricula
);

export { matriculasRoute };
