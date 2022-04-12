import { Services } from "../services/Services.mjs";

const niveisServices = new Services("Niveis");

class NivelController {
  static async pegaTodosOsNiveis(request, response) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
      return response.status(200).json(todosOsNiveis);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async pegaUmNivel(request, response) {
    const { id } = request.params;
    try {
      const nivel = await niveisServices.pegaUmRegistro(Number(id));
      return response.status(200).json(nivel);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async criaNivel(request, response) {
    const novoNivel = request.body;
    try {
      const nivelCriado = await niveisServices.criaRegistro(novoNivel);
      return response.status(200).json(nivelCriado);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async atualizaNivel(request, response) {
    const novasInfos = request.body;
    const { id } = request.params;
    try {
      await niveisServices.atualizaRegistro(novasInfos, Number(id));
      const nivelAtualizado = await niveisServices.pegaUmRegistro(Number(id));
      return response.status(200).json(nivelAtualizado);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async apagaNivel(request, response) {
    const { id } = request.params;
    try {
      await niveisServices.apagaRegistro(Number(id));
      return response
        .status(200)
        .json({ mensagem: `Deletado o nivel de id: ${id}` });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  static async restauraNivel(request, response) {
    const { id } = request.params;
    try {
      await niveisServices.restauraRegistro(Number(id));
      return response.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { NivelController };
