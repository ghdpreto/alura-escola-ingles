import { PessoasServices } from "../services/PessoasServices.mjs";

const pessoaServices = new PessoasServices("Pessoas");

class PessoaController {
  static async pegaTodasAsPessoasAtivas(request, response) {
    try {
      const pessoasAtivas = await pessoaServices.pegaRegistrosAtivos();
      return response.status(200).json(pessoasAtivas);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async pegaTodasAsPessoas(request, response) {
    try {
      const todasAsPessoas = await pessoaServices.pegaTodosOsRegistros();

      return response.status(200).json(todasAsPessoas);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async pegaUmaPessoa(request, response) {
    const { id } = request.params;

    try {
      const pessoa = await pessoaServices.pegaUmRegistro({ id: Number(id) });
      if (pessoa) {
        return response.status(200).json(pessoa);
      } else {
        return response.status(404).json(pessoa);
      }
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async criaPessoa(request, response) {
    const novaPessoa = request.body;

    try {
      const novaPessoaCriada = await pessoaServices.criaRegistro(novaPessoa);

      return response.status(201).json(novaPessoaCriada);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async atualizaPessoa(request, response) {
    const novasInfo = request.body;
    const { id } = request.params;

    try {
      await pessoaServices.atualizaRegistro(novasInfo, Number(id));
      const pessoaAtualizada = await pessoaServices.pegaUmRegistro({
        id: Number(id),
      });
      return response.status(200).json(pessoaAtualizada);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async apagaPessoa(request, response) {
    const { id } = request.params;

    try {
      await pessoaServices.apagaRegistro(Number(id));
      return response
        .status(200)
        .json({ mensagem: `Registro ID: ${id} foi deletado!` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async restauraPessoa(request, response) {
    const { id } = request.params;

    try {
      await pessoaServices.restauraRegistro(Number(id));

      return response.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async cancelaPessoa(request, response) {
    const { estudanteId } = request.params;

    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudanteId));
      return response.status(200).json({
        mensagem: `Matriculas do estudandte ${estudanteId} canceladas`,
      });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async pegaMatriculas(request, response) {
    const { estudanteId } = request.params;

    try {
      const matriculas = await pessoaServices.pegaMatriculasPorEstudante({
        id: Number(estudanteId),
      });

      return response.status(200).json(matriculas);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { PessoaController };
