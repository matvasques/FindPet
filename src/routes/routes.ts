import express from 'express';
import usersRoutes from './users-routes';
import animalsRoutes from './animals-routes';
import occurrenceRoutes from './occurrence-routes';

const routes = express.Router();


usersRoutes(routes)

animalsRoutes(routes);

occurrenceRoutes(routes);


export default routes;