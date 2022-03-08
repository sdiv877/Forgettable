/**
 * Controller contains high-level operations using services, consumed by routes
 */
import { NextFunction, Request, Response } from 'express';
import PersonModel from '../models/person.model';
import logger from '../utils/logger';

export const createPerson = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info("POST /persons/create request from frontend");

  try {
    // Grab the data from the req
    const {
      first_name,
      last_name,
      birthday,
      interests,
      organisation,
      time_added,
      how_we_met,
      // encounters
    } = req.body;

    // Pass it into a model and attempt to save it to the db
    await new PersonModel({
      first_name,
      last_name,
      birthday,
      interests,
      organisation,
      time_added,
      how_we_met
      // encounters
    }).save();

    // Notify frontend that the operation was successful
    res.status(200).end();
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

  // Attempt to find personID in db
  const foundPerson = await PersonModel.findOne({_id: req.params.personID});

  // If successful, send data to frontend
  if (foundPerson) {
    res.status(200).json(foundPerson);
  // Otherwise notify frontend nothing was found
  } else {
    res.status(404);
  }
};