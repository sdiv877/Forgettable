/**
 * Route configures endpoints, and attaches controller as an action to each route's REST methods
 */
import { Router } from 'express';
import { createPerson, getPerson, deletePerson } from '../controllers/person.controller';

const routes = Router();

routes.post('/create', createPerson);
routes.get('/:personID', getPerson);
routes.delete('/:personID', deletePerson);

export default routes;
