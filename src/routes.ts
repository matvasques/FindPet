import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionsController from './controllers/ConnectionsController';


const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({msg: "Hello World!"})
})

export default routes;