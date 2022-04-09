import db from '../models/index.js'

class TurmaController {
    static async pegaTodasAsTurmas(request, response) {
        try {
            const todasAsTurmas = await db.Turmas.findAll();
            return response.status(200).json(todasAsTurmas)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma(request, response) {
        const {id} = request.params
        try {
            const turma = await db.Turmas.findOne({where: {id:Number(id)}})
            return response.status(200).json(turma)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async criaTurma(request, response) {
        const novaTurma = request.body
        try {
            const turmaCriada = await db.Turmas.create(novaTurma)
            return response.status(200).json(turmaCriada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaTurma(request, response) {
        const novasInfos = request.body
        const {id} = request.params
        try {
            await db.Turmas.update(novasInfos, {where: {id: Number(id)}})
            const turmaAtualizada = await db.Turmas.findOne({where: {id: Number(id)}})
            return response.status(200).json(turmaAtualizada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaTurma(request, response) {
        const {id} = request.params
        try {
            await db.Turmas.destroy({where: {id:Number(id)}})
            return response.status(200).json({mensagem: `Deletado a turma de id: ${id}`})
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }
    
}

export {TurmaController}