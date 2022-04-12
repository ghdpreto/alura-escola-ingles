import db from "../models/index.js";

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros(where = {}) {
    return await db[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaUmRegistro(id) {
    return await db[this.nomeDoModelo].findOne({ where: { id: id } });
  }

  async criaRegistro(dados) {
    return await db[this.nomeDoModelo].create(dados);
  }

  async apagaRegistro(id) {
    return await db[this.nomeDoModelo].destroy({ where: { id: id } });
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return await db[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: { id: id },
      },
      transacao
    );
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return await db[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: { ...where },
      },
      transacao
    );
  }

  async restauraRegistro(id) {
    return await db[this.nomeDoModelo].restore({ where: { id: id } });
  }
}

export { Services };
