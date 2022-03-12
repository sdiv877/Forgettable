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
  new mongoose.Types.ObjectId('622ade14db79f3eb6224770e'),
  new mongoose.Types.ObjectId('622ade396c3ad1d379623505'),
  new mongoose.Types.ObjectId('622ade3c979482a64ede8e35'),
  new mongoose.Types.ObjectId('622ade4ae3fb2d1a195f9521')
]

const requestPersonData = new Array<PersonModel>(
  {
    full_name: 'Sally Smith',
    birthday: new Date('2022-01-01'),
    gender: "",
    location: "NZ",
    first_met: new Date('2022-01-01'),
    how_we_met: 'at Uni',
    interests: ['a', 'b'],
    organisation: 'An org',
    time_updated: new Date('2022-01-01'),
    social_media: new Map<string, string>([
      ["github", "gitUser"],
      ["discord", "discordUser"]
    ]),
    image: Buffer.from(""),
    encounters: [mockEncounters[0], mockEncounters[1], mockEncounters[2]],
  },
  {
    full_name: 'John Herriot',
    birthday: new Date('2022-01-01'),
    gender: "",
    location: "NZ",
    first_met: new Date('2022-01-01'),
    how_we_met: 'At the library',
    interests: ['a', 'b'],
    organisation: 'An org',
    time_updated: new Date('2022-01-01'),
    social_media: new Map<string, string>([
      ["github", "gitUser"],
      ["discord", "discordUser"]
    ]),
    image: Buffer.from(""),
    encounters: [mockEncounters[0], mockEncounters[1]]
  },
  {
    full_name: 'Kate James',
    birthday: new Date('2022-01-01'),
    gender: "",
    location: "AU",
    first_met: new Date('2022-01-01'),
    how_we_met: 'At the Beach',
    interests: ['a', 'b'],
    organisation: 'An org',
    time_updated: new Date('2022-01-01'),
    social_media: new Map<string, string>([
      ["github", "gitUser"],
      ["discord", "discordUser"]
    ]),
    image: Buffer.from(""),
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
    expect(result.full_name).toEqual(requestPersonData[0].full_name);
  });
});

describe('person', () => {
  it('can be queried by location', async () => {
    for (let i = 0; i < requestPersonData.length; i++) {
      await supertest(app).post('/api/persons')
        .set('Accept', 'application/json')
        .send(requestPersonData[i])
        .expect(httpStatus.CREATED);
    }

    const { body } = await supertest(app).get(`/api/persons?location=NZ`);
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
