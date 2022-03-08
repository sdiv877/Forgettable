/**
 * Controller contains high-level operations using services, consumed by routes
 */
import { NextFunction, Request, Response } from 'express';

import PersonModel from '../models/person.model';
import personService from '../services/person.service';
import logger from '../utils/logger';

export const createPerson = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info("POST /persons/create request from frontend");

  try {
    // Grab the data from the req
    const personReq = getPersonFromReqBody(req.body);

    // Pass data to service and attempt to save
    const createdPerson = await personService.createPerson(personReq);

    // Notify frontend that the operation was successful
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

export const getPerson = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info("GET /persons/:personID request from frontend");

  // Attempt to find person with given ID in db
  const foundPerson = await personService.getPerson(req.params.personID);

  if (!foundPerson) {
    // If nothing was found log an error
    logger.error(`A person with ID ${req.params.personID} could not be found.`)
    res.sendStatus(404);
  } else {
    // Otherwise send res to frontend
    res.send(foundPerson);
  }
};

// Util function that won't be needed regularly
const getPersonFromReqBody = (body: any) => {
  const person = {
      first_name: body.first_name,
      last_name: body.last_name,
      birthday: body.birthday,
      interests: body.interests,
      organisation: body.organisation,
      time_added: body.time_added,
      how_we_met: body.how_we_met,
      encounters: body.encounters
  }

  return person;
}