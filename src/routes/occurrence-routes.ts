import express, { Router } from 'express';
import OccurrencesControllers from '../controllers/OccurrencesControllers';

const occurrencesControllers = new OccurrencesControllers();

const occurrenceRoutes = (routes: Router) => {
  //Occurrence
  routes.post('/:idAnimal/createOccurrence', occurrencesControllers.createOcurrence);
  routes.get('/showOccurrences', occurrencesControllers.showOccurrence);
  routes.put('/updateOccurrences/:idOccurrence', occurrencesControllers.updateOccurrence);
  routes.delete('/removeOccurrences', occurrencesControllers.removeOccurrence);
}

export default occurrenceRoutes;