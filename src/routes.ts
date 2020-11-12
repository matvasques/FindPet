import express from 'express';
import UsersControllers from './controllers/UsersControllers';
import AnimalsControllers from './controllers/AnimalsControllers';
import OccurrencesControllers from './controllers/OccurrencesControllers';

const routes = express.Router();

const usersControllers = new UsersControllers();
const animalsControllers  = new AnimalsControllers();
const occurrencesControllers = new OccurrencesControllers();

//Rotas de usuarios
routes.post('/createUser', usersControllers.createUser);
routes.get('/showUsers', usersControllers.showUsers);
routes.put('/update/:idUser', usersControllers.updateUser);
routes.delete('/remove', usersControllers.removeUser);

//Rotas de animais
routes.post('/:idUser/createAnimal', animalsControllers.createAnimal);
routes.get('/showAnimals', animalsControllers.showAnimal);
routes.put('/updateAnimal/:idAnimal', animalsControllers.updateAnimal);
routes.delete('/deleteAnimal', animalsControllers.removeAnimal)

//Occurrence
routes.post('/:idAnimal/createOccurrence', occurrencesControllers.createOcurrence);
routes.get('/showOccurrences', occurrencesControllers.showOccurrence);
routes.put('/updateOccurrences/:idOccurrence', occurrencesControllers.updateOccurrence);
routes.delete('/removeOccurrences', occurrencesControllers.removeOccurrence);


export default routes;