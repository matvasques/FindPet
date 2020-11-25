import express, { Router } from 'express';
import AnimalsControllers from '../controllers/AnimalsControllers';

const animalsControllers  = new AnimalsControllers();

const animalsRoutes = (routes: Router) => {
  //Rotas de animais
routes.post('/:idUser/createAnimal', animalsControllers.createAnimal);
routes.get('/:idUser/showAnimals', animalsControllers.showAnimal);
routes.get('/searchForAnimal/:idAnimal', animalsControllers.searchForAnimal)
routes.put('/updateAnimal/:idAnimal', animalsControllers.updateAnimal);
routes.delete('/deleteAnimal', animalsControllers.removeAnimal);
}

export default animalsRoutes;