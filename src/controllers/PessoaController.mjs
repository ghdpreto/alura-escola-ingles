import db from '../models/index.js'

class PessoaController {
    static async pegaTodasAsPessoas(request, response) {
        try {
            const todasAsPessoas = await db.Pessoas.findAll();
    
            return response.status(200).json(todasAsPessoas)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async pegaUmaPessoa(request, response) {
        const {id} = request.params
        
        try {
            const pessoa = await db.Pessoas.findOne({where: {id: Number(id)}})
            if(pessoa) {
                return response.status(200).json(pessoa)
            } else {
                return response.status(404).json(pessoa)
            }
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async criaPessoa(request, response) {
        const novaPessoa = request.body

        try {
            const novaPessoaCriada = await db.Pessoas.create(novaPessoa)

            return response.status(201).json(novaPessoaCriada)

        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async atualizaPessoa(request, response) {
        const novasInfo = request.body
        const { id } = request.params

        try {
            await db.Pessoas.update(novasInfo, {where: {id:id}})
            const pessoaAtualizada = await db.Pessoas.findOne({where: {id:id}})
            return response.status(200).json(pessoaAtualizada)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async apagaPessoa(request, response) {
        const {id} = request.params

        try {
            await db.Pessoas.destroy({ where: {id: id}})
            return response.status(200).json({mensagem: `Registro ID: ${id} foi deletado!`})
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async restauraPessoa(request, response) {
        const {id} = request.params

        try {
            await db.Pessoas.restore({where: {id: Number(id) }})

            return response.status(200).json({mensagem: `id ${id} restaurado`})

        } catch (error) {
            return response.status(500).json(error)
        }
    }


    //MATRICULA
    static async pegaUmaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params
        
        try {
            const umaMatricula = await db.Matriculas.findOne({where: {id: Number(matriculaId), estudante_id: Number(estudanteId) }})
            if(umaMatricula) {
                return response.status(200).json(umaMatricula)
            } else {
                return response.status(404).json(umaMatricula)
            }
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async criaMatricula(request, response) {
        const { estudanteId } = request.params
        const novaMatricula = { ... request.body, estudante_id: Number(estudanteId) }

        try {
            const novaMatriculaCriada = await db.Matriculas.create(novaMatricula)

            return response.status(201).json(novaMatriculaCriada)

        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async atualizaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params
        const novasInfo = request.body

        try {
            await db.Matriculas.update(novasInfo, { where: { 
                id: Number(matriculaId), 
                estudante_id: Number(estudanteId) 
                }
            })

            const matriculaAtualizada = await db.Matriculas.findOne({ where: { 
                id: Number(matriculaId), 
                estudante_id: Number(estudanteId) 
                }
            })

            return response.status(200).json(matriculaAtualizada)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    static async apagaMatricula(request, response) {
        const { estudanteId, matriculaId } = request.params

        try {
            await db.Matriculas.destroy({ where: {id: Number(matriculaId), estudante_id: Number(estudanteId)}})
            return response.status(200).json({mensagem: `Registro ID: ${matriculaId} foi deletado!`})
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export { PessoaController }