import { Router } from 'express';
import person from './person.route';
import encounter from './encounter.route';

const routes = Router();

routes.use('/persons', person);
routes.use('/encounters', encounter);


export default routes;
