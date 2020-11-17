import {Request, Response} from 'express';
import knex from '../database/connection';
import DateParser from '../utils/DateParser';

class OccurrencesControllers{
    async createOcurrence(request: Request, response: Response){
        const { description } = request.body;
        const animalId = request.params;
        let animalID = Object.values(animalId);

        const dateParser = new DateParser();

        const trx = await knex.transaction();

        try{
            const date = dateParser.date();
    
            await trx('occurrence').insert({
                startDate: date,
                description,
                animalID: animalID
            });

            await trx.commit();
            return response.status(201).json({msg: 'Ocorrência cadastrada com sucesso!'});
        }
        catch(error){
            console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao cadastrar sua ocorrência. Tente novamente.'
            });
        }    
    }

    async showOccurrence(request: Request, response: Response){
        try{
            const occurrences = await knex('occurrence').select('occurrence.*')
            return response.status(200).json(occurrences);
        }
        catch(error){
            console.log("ERROR: " + error);
            return response.status(404).json({error: 'Sua solicitação não foi encontrada'});
        }
    }

    async updateOccurrence(request: Request, response: Response){
        const {idOccurrence} = request.params;
        const {description} = request.body;
        const dateParser = new DateParser();

        const date = dateParser.date();

        const trx = await knex.transaction();

        try{
            await trx('occurrence').where('id', idOccurrence).update({
                description,
                startDate: date,
            });
    
            await trx.commit();
            return response.status(200).json({msg: 'Ocorrência atualizada com sucesso!'});
        }
        catch(error){
            console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao atualizar sua ocorrência. Tente novamente.'
            });
        }
        
    }

    async removeOccurrence(request: Request, response: Response){
        const {id} = request.body;

        const deleted = await knex('occurrence').where('id', id).del();

        if(deleted == 0){
            return response.status(400).json({error: 'Ocorrência não existe ou já foi removida'});
        }
        
        return response.status(200).json({msg: 'Ocorrência removida com sucesso!'});
    }
    
}

export default OccurrencesControllers;