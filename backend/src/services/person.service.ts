/**
 * Service contains database operations
 */
import Person, { PersonModel } from '../models/person.model';

export const createPerson = async (personDetails: PersonModel) => {
  const person = new Person(personDetails);
  await person.save();
  return person;
};

export const getPerson = async (personID: string) => {
  const person = Person.findById(personID);
  return person;
}

const personService = {
  createPerson,
  getPerson
}

export default personService;