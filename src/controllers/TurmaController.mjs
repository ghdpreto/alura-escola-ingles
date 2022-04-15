import { Op } from "sequelize";
import { Services } from "../services/Services.mjs";

const turmaServices = new Services("Turmas");

class TurmaController {
  static async pegaTodasAsTurmas(request, response) {
    const { dtInicial, dtFinal } = request.query;
    const where = {};

    //construindo where com between
    dtInicial || dtFinal ? (where.data_inicio = {}) : null;
    dtInicial ? (where.data_inicio[Op.gte] = dtInicial) : null;
    dtFinal ? (where.data_inicio[Op.lte] = dtFinal) : null;

    try {
      const todasAsTurmas = await turmaServices.pegaTodosOsRegistros(where);
      return response.status(200).json(todasAsTurmas);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async pegaUmaTurma(request, response) {
    const { id } = request.params;
    try {
      const turma = await turmaServices.pegaUmRegistro(Number(id));
      return response.status(200).json(turma);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async criaTurma(request, response) {
    const novaTurma = request.body;
    try {
      const turmaCriada = await turmaServices.criaRegistro(novaTurma);
      return response.status(200).json(turmaCriada);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async atualizaTurma(request, response) {
    const novasInfos = request.body;
    const { id } = request.params;
    try {
      await turmaServices.atualizaRegistro(novasInfos, Number(id));

      const turmaAtualizada = await turmaServices.pegaUmRegistro(Number(id));
      return response.status(200).json(turmaAtualizada);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async apagaTurma(request, response) {
    const { id } = request.params;
    try {
      await turmaServices.apagaRegistro(Number(id));
      return response
        .status(200)
        .json({ mensagem: `Deletado a turma de id: ${id}` });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async restauraTurma(request, response) {
    const { id } = request.params;

    try {
      await turmaServices.restauraRegistro(Number(id));

      return response.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { TurmaController };
