import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

/**
 * GET: Buscar ou listar uma info
 * POST: Criar uma nova info
 * PUT: Atualizar uma info existente
 * DELETE: Deletar uma info existente
 * 
 * Corpo(request.body): dados para criacao  ou atualização de um registro
 * Route Params: Identificar qual recurso eu quero atualizar ou deletar (app.delete('/users/:id'))
 * Query Params: Paginação, filtros, ordenação
 */

//plugin para express executar json
app.use(express.json());
app.use(cors());

app.use(routes) 

app.listen(3333);