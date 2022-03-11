import mongoose from 'mongoose';
import httpStatus from 'http-status';
import databaseOperations from '../../utils/test/db-handler';
import { PersonModel } from '../../models/person.model';
import app from '../../server';

const supertest = require('supertest');

beforeAll(async () => databaseOperations.connectDatabase());
afterEach(async () => databaseOperations.clearDatabase());
afterAll(async () => databaseOperations.closeDatabase());

const mockEncounters = [
  '622ade14db79f3eb6224770e',
  '622ade396c3ad1d379623505',
  '622ade3c979482a64ede8e35',
  '622ade4ae3fb2d1a195f9521'
]

const requestPersonData = new Array(
  {
    first_name: 'Sally',
    last_name: 'Smith',
    interests: ['a', 'b'],
    organisation: 'NZ',
    time_added: new Date('2022-01-01'),
    how_we_met: 'at Uni',
    birthday: new Date('2002-12-12'),
    encounters: [mockEncounters[0], mockEncounters[1], mockEncounters[2]]
  },
  {
    first_name: 'John',
    last_name: 'Herriot',
    interests: ['a', 'b'],
    organisation: 'NZ',
    time_added: new Date('2022-01-01'),
    how_we_met: 'at the Library',
    birthday: new Date('2002-12-12'),
    encounters: [mockEncounters[0], mockEncounters[1]]
  },
  {
    first_name: 'Kate',
    last_name: 'James',
    interests: ['a', 'b'],
    organisation: 'AU',
    time_added: new Date('2022-01-01'),
    how_we_met: 'at the Beach',
    birthday: new Date('2002-12-12'),
    encounters: [mockEncounters[3]]
  })

describe('person', () => {
  it('can be created correctly', async () => {
    await supertest(app).post('/api/persons')
      .set('Accept', 'application/json')
      .send(requestPersonData[0])
      .expect(httpStatus.CREATED);

    const { body } = await supertest(app).get('/api/persons');
    expect(body).toHaveLength(1);
    const result: PersonModel = body[0];
    expect(result.first_name).toEqual(requestPersonData[0].first_name);
    expect(result.last_name).toEqual(requestPersonData[0].last_name);
  });
});

describe('person', () => {
  it('can be queried by organisation', async () => {
    for (let i = 0; i < requestPersonData.length; i++) {
      await supertest(app).post('/api/persons')
        .set('Accept', 'application/json')
        .send(requestPersonData[i])
        .expect(httpStatus.CREATED);
    }

    const { body } = await supertest(app).get(`/api/persons?organisation=NZ`);
    expect(body).toHaveLength(2);
  });
});

describe('person', () => {
  it('can be queried by encounter', async () => {
    for (let i = 0; i < requestPersonData.length; i++) {
      await supertest(app).post('/api/persons')
        .set('Accept', 'application/json')
        .send(requestPersonData[i])
        .expect(httpStatus.CREATED);
    }

    const { body } = await supertest(app).get(`/api/persons?encounters=${mockEncounters[0]}`);
    expect(body).toHaveLength(2);
  });
});
