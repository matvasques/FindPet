import {Request, Response} from 'express';
import knex from '../database/connection';

class UsersControllers{ 
  //metodo para cadastro
  async createUser(request: Request, response: Response){
    const {email} = request.body;

    const trx = await knex.transaction();

    const emailExists = await trx('users').where('email', email).first();
    
    if(emailExists){
      await trx.rollback();
      return response.status(400).json({error: 'E-mail já cadastrado'});
    }
    
    await trx('users').insert(request.body);
    await trx.commit();
    
    return response.json(`Usuário cadastrado com sucesso!`);

  }

  //método para mostrar os animais cadastrados. A ser modificado
  async showUsers(request: Request, response: Response){
    //const animals = await knex('users').join('address', 'users.addressID', 'address.id').join('contact', 'users.contactID', 'contact.id').select('users.*', 'address.*', 'contact.*');
    const users = await knex('users').select('users.*')
    return response.json(users);
  }

  //metodo para atualizar informações
  async updateUser(request: Request, response: Response){
    const {id} = request.params;
    const {
      name, email, phoneNumber, password, publicPlace, houseNumber, complement, postalCode, neighborhood, city, uf, country
    } = request.body

    const trx = await knex.transaction();

    const idExists = await trx('users').where('id', id).first();

    if(!idExists){
      return response.status(400).json({error: "Usuário não existe"});
    }

    const emailExists = await trx('users').where('email', email).first();
    
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
    return response.json('Usuário atualizado com sucesso!');
  }

  //metodo para deletar usuario
  async removeUser(request: Request, response: Response){
    const {id} = request.body;

    const deleted = await knex('users').where('id', id).del();

    if(deleted == 0){
      return response.json('Conta não existe ou já foi removida');
    }
    
    return response.json('Conta removida com sucesso!');
  }

}

export default UsersControllers;