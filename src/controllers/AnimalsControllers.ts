import {Request, Response} from 'express';
import knex from '../database/connection';

class AnimalsControllers{
    async createAnimal(request: Request, response: Response){
        const {petName, breeds, description, imgURL}  = request.body;
        const userId = request.params;
        let userID = Object.values(userId)

        const trx = await knex.transaction();
        
        try{
            await trx('animal').insert({
                petName,
                breeds,
                description,
                imgURL,
                userID
            });
    
            await trx.commit();
            return response.status(201).json(`${petName} cadastrado com sucesso!`);
        }
        catch(error){
            console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao cadastrar seu Pet. Tente novamente.'
            });
        }    
    }

    async showAnimal(request: Request, response: Response){
        const { idUser } = request.params;
        const trx = await knex.transaction();

        try{
            
            const idExists = await trx('users').where('id', idUser).first();
            
            if(!idExists){
                return response.status(400).json({error: 'Usuario não existe'});
            }
            else{
                const animals = await trx('animal').where('userID', idUser).select('animal.*');
                return response.status(200).json(animals);
            }  
        }
        catch(error){
            console.log("ERROR: " + error);
            return response.status(404).json({error: 'Sua solicitação não foi encontrada'});
        }
    }

    async searchForAnimal(request: Request, response: Response){
        const { idAnimal } = request.params;

        const trx = await knex.transaction();

        try{
            const idExists = await trx('animal').where('id', idAnimal).first();
            if(!idExists){
                return response.status(400).json({error: 'Pet não existe'});
            }

            const animal = await trx('animal').where('id', idAnimal).select('animal.*');
            return response.status(200).json(animal);
        }
        catch(error){
            console.log("ERROR: " + error);
            return response.status(404).json({error: 'Sua solicitação não foi encontrada'});
        }
    }

    async updateAnimal(request: Request, response: Response){
        const {idAnimal}  = request.params;
        const {petName, breeds, description, imgURL} = request.body;

        const trx = await knex.transaction();

        try{
            const idExists = await trx('animal').where('id', idAnimal).first();

            if(!idExists){
                return response.status(400).json({error: 'Pet não existe'});
            }

            await trx('animal').where('id', idAnimal).
            update({
                petName,
                breeds,
                description,
                imgURL,
            });
            
            await trx.commit();
            return response.status(200).json({msg: 'Pet atualizado com sucesso'});
        }
        catch(error){
            console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao atualizar seu Pet. Tente novamente.'
            });;
            
        }
        
    }

    async removeAnimal(request: Request, response: Response){
        const {id} = request.body;

        const deleted = await knex('animal').where('id', id).del();

        if(deleted == 0){
            return response.status(400).json({error: 'Pet não existe ou já foi removido'});
        }
        
        return response.status(200).json({msg: 'Pet removido com sucesso!'});
    }
}

export default AnimalsControllers;