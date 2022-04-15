import db from "../models/index.js";
import { Services } from "./Services.mjs";

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  // metodos especificos de pessoas
  async pegaRegistrosAtivos(where = {}) {
    return await db[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaTodosOsRegistros(where = {}) {
    return await db[this.nomeDoModelo]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return await db.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, estudanteId, {
        transaction: transacao,
      });

      await this.matriculas.atualizaRegistros(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        { transaction: transacao }
      );
    });
  }

  async pegaMatriculasPorEstudante(where = {}) {
    const matriculas = await db[this.nomeDoModelo].findOne({
      where: { ...where },
    });

    return matriculas.getAulasMatriculadas();
  }
}

export { PessoasServices };
