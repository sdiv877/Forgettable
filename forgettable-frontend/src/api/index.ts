import axios, { AxiosResponse } from 'axios'
import { PersonModel } from '../../../backend/src/models/person.model'

const baseURL: string = 'http://localhost:5000/api';

const getPerson = async (_id: string): Promise<AxiosResponse<PersonModel>> => { 
    const foundDocJsonRes =  axios.get<PersonModel>(`${baseURL}/persons/${_id}`);
    return foundDocJsonRes;
};

const createPerson = async (newPerson: PersonModel): Promise<AxiosResponse<PersonModel>> => { 
    const createdDocJsonRes =  axios.post<PersonModel>(`${baseURL}/persons/create/`, 
        {
            first_name: newPerson.first_name,
            last_name: newPerson.last_name,
            birthday: newPerson.birthday,
            interests: newPerson.interests,
            organisation: newPerson.organisation,
            time_added: newPerson.time_added,
            how_we_met: newPerson.how_we_met,
            encounters: newPerson.encounters
        });

    return createdDocJsonRes;
};

const api = {
    getPerson,
    createPerson,
}

export default api;