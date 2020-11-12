import {Request, Response} from 'express';
import knex from '../database/connection';
import crypto from 'crypto';

class UsersControllers{ 
  //metodo para cadastro
  async createUser(request: Request, response: Response){
    const {
      name, email, phoneNumber, password, publicPlace, houseNumber, complement, postalCode, neighborhood, city, uf, country
    } = request.body

    const trx = await knex.transaction();

    const emailExists = await trx('users').where('email', email).first();
    
    if(emailExists){
      await trx.rollback();
      return response.status(400).json({error: 'E-mail já cadastrado'});
    }

    //criptografar senha
    let hash = crypto.createHash('sha256');
    hash.update(password);
    let passwordCryp = hash.digest('hex');
    
    try{
      await trx('users').insert(
        {
          name,
          email,
          phoneNumber, 
          password: passwordCryp, 
          publicPlace, 
          houseNumber, 
          complement, 
          postalCode, 
          neighborhood, 
          city, 
          uf, 
          country
        } 
      );
      await trx.commit();
      return response.status(201).json(`Usuário cadastrado com sucesso!`);
    }

    catch(error){
      console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao realizar seu cadastro. Tente novamente.'
            });
    }
  }

  //método para mostrar os animais cadastrados. A ser modificado
  async showUsers(request: Request, response: Response){
    
    try{
      const users = await knex('users').select('users.*');
      return response.status(200).json(users);
    }
    catch(error){
      console.log("ERROR: " + error);
      return response.status(404).json('Sua solicitação não foi encontrada');
    }
  }

  //metodo para atualizar informações
  async updateUser(request: Request, response: Response){
    const {id} = request.params;
    const {
      name, email, phoneNumber, password, publicPlace, houseNumber, complement, postalCode, neighborhood, city, uf, country
    } = request.body

    const trx = await knex.transaction();
    
    try{
      const idExists = await trx('users').where('id', id).first();

      if(!idExists){
        return response.status(400).json({error: "Usuário não existe"});
      }

      //const emailExists = await trx('users').where('email', email).first();
      
      /*if(emailExists){
        await trx.rollback();
        console.log(requestObj)
        return response.status(400).json({error: 'E-mail já cadastrado'});
      }
      */

      await trx('users').where('id', id).
        update(
          {
            name,
            email,
            phoneNumber, 
            password, 
            publicPlace, 
            houseNumber, 
            complement, 
            postalCode, 
            neighborhood, 
            city, 
            uf, 
            country
          } 
        );

      await trx.commit();
      return response.status(200).json('Usuário atualizado com sucesso!');
    }
    
    catch(error){
      console.log("ERROR: " + error);
            await trx.rollback();
            return response.status(400).json({
                error: 'Algo deu errado ao atualizar seu cadastro. Tente novamente.'
            });
    }
  }

  //metodo para deletar usuario
  async removeUser(request: Request, response: Response){
    const {id} = request.body;

    const deleted = await knex('users').where('id', id).del();

    if(deleted == 0){
      return response.json('Conta não existe ou já foi removida');
    }
    
    return response.status(200).json('Conta removida com sucesso!');
  }

}

export default UsersControllers;