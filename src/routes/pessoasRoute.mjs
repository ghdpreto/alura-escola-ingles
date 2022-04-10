import { Router } from "express";
import { PessoaController } from "../controllers/PessoaController.mjs";

const pessoasRoute = Router();


pessoasRoute.get('/todos', PessoaController.pegaTodasAsPessoas)
pessoasRoute.get('/', PessoaController.pegaTodasAsPessoasAtivas)
pessoasRoute.get('/:id', PessoaController.pegaUmaPessoa)
pessoasRoute.post('/', PessoaController.criaPessoa)
pessoasRoute.post('/:id/restaura', PessoaController.restauraPessoa)
pessoasRoute.put('/:id', PessoaController.atualizaPessoa)
pessoasRoute.delete('/:id', PessoaController.apagaPessoa)

pessoasRoute.get('/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
pessoasRoute.post('/:estudanteId/matricula/', PessoaController.criaMatricula)
pessoasRoute.put('/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
pessoasRoute.delete('/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

export { pessoasRoute }