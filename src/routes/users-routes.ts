import express, { Router } from 'express';
import UsersControllers from '../controllers/UsersControllers';


const usersControllers = new UsersControllers();

const usersRoutes = (routes: Router) => {
  //Rotas de usuarios
  routes.post('/createUser', usersControllers.createUser);
  routes.get('/showUsers', usersControllers.showUsers);
  routes.put('/update/:idUser', usersControllers.updateUser);
  routes.delete('/remove', usersControllers.removeUser);
}

export default usersRoutes;