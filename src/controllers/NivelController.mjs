import db from '../models/index.js'

class NivelController {
    static async pegaTodosOsNiveis(request, response) {
        try {
            const todosOsNiveis = await db.Niveis.findAll();
            return response.status(200).json(todosOsNiveis)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(request, response) {
        const {id} = request.params
        try {
            const nivel = await db.Niveis.findOne({where: {id:Number(id)}})
            return response.status(200).json(nivel)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async criaNivel(request, response) {
        const novoNivel = request.body
        try {
            const nivelCriado = await db.Niveis.create(novoNivel)
            return response.status(200).json(nivelCriado)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaNivel(request, response) {
        const novasInfos = request.body
        const {id} = request.params
        try {
            await db.Niveis.update(novasInfos, {where: {id: Number(id)}})
            const nivelAtualizado = await db.Niveis.findOne({where: {id: Number(id)}})
            return response.status(200).json(nivelAtualizado)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaNivel(request, response) {
        const {id} = request.params
        try {
            await db.Niveis.destroy({where: {id:Number(id)}})
            return response.status(200).json({mensagem: `Deletado o nivel de id: ${id}`})
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async restauraNivel(request, response) {
        const {id} = request.params

        try {
            await db.Niveis.restore({where: {id: Number(id) }})

            return response.status(200).json({mensagem: `id ${id} restaurado`})

        } catch (error) {
            return response.status(500).json(error)
        }
    }
    
}

export {NivelController}