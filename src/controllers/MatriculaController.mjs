import { Sequelize } from "sequelize";
import { Services } from "../services/Services.mjs";

const matriculaServices = new Services("Matriculas");

class MatriculaController {
  static async pegaUmaMatricula(request, response) {
    const { estudanteId, matriculaId } = request.params;

    try {
      const umaMatricula = await matriculaServices.pegaUmRegistro({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });
      if (umaMatricula) {
        return response.status(200).json(umaMatricula);
      } else {
        return response.status(404).json(umaMatricula);
      }
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async criaMatricula(request, response) {
    const { estudanteId } = request.params;
    const novaMatricula = {
      ...request.body,
      estudante_id: Number(estudanteId),
    };

    try {
      const novaMatriculaCriada = await matriculaServices.criaRegistro(
        novaMatricula
      );

      return response.status(201).json(novaMatriculaCriada);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async atualizaMatricula(request, response) {
    const { estudanteId, matriculaId } = request.params;
    const novasInfo = request.body;

    try {
      await matriculaServices.atualizaRegistros(novasInfo, {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      const matriculaAtualizada = await matriculaServices.pegaTodosOsRegistros({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });

      return response.status(200).json(matriculaAtualizada);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async apagaMatricula(request, response) {
    const { estudanteId, matriculaId } = request.params;

    try {
      await matriculaServices.apagaRegistro({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });
      return response
        .status(200)
        .json({ mensagem: `Registro ID: ${matriculaId} foi deletado!` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async pegaMatriculasPorTurma(request, response) {
    const { turmaId } = request.params;

    try {
      const todasAsMatriculas = await matriculaServices.encontraEContaRegistros(
        {
          turma_id: Number(turmaId),
          status: "confirmado",
        },
        { limit: 20, order: [["estudante_id", "DESC"]] }
      );
      return response.status(200).json(todasAsMatriculas);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async pegaTurmasLotadas(request, response) {
    const limite = 2;

    try {
      const turmasLotadas = await matriculaServices.encontraEContaRegistros(
        { status: "confirmado" },
        {
          attributes: ["turma_id"],
          group: ["turma_id"],
          having: Sequelize.literal(`count(turma_id) >= ${limite}`),
        }
      );

      return response.status(200).json(turmasLotadas.count);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async restauraMatricula(request, response) {
    const { estudanteId, matriculaId } = request.params;

    try {
      await matriculaServices.restauraRegistro({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });
      return response
        .status(200)
        .json({ mensagem: `Registro ID: ${matriculaId} foi restaurado!` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { MatriculaController };
