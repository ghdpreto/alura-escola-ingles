import { Router } from "express";
import { PessoaController } from "../controllers/PessoaController.mjs";

const pessoasRoute = Router();

pessoasRoute.get("/", PessoaController.pegaTodasAsPessoas);
pessoasRoute.get("/ativas", PessoaController.pegaTodasAsPessoasAtivas);
pessoasRoute.get("/:id", PessoaController.pegaUmaPessoa);
pessoasRoute.get("/:estudanteId/matricula", PessoaController.pegaMatriculas);

pessoasRoute.post("/", PessoaController.criaPessoa);
pessoasRoute.post("/:id/restaura", PessoaController.restauraPessoa);
pessoasRoute.post("/:estudanteId/cancela", PessoaController.cancelaPessoa);

pessoasRoute.put("/:id", PessoaController.atualizaPessoa);
pessoasRoute.delete("/:id", PessoaController.apagaPessoa);

export { pessoasRoute };