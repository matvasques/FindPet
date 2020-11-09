import express from 'express';
import UsersControllers from './controllers/UsersControllers';

const routes = express.Router();
const usersControllers = new UsersControllers();


routes.post('/createUser', usersControllers.createUser);

routes.get('/showUsers', usersControllers.showUsers);

routes.delete('/remove', usersControllers.removeUser);

routes.put('/update/:id', usersControllers.updateUser);



export default routes;