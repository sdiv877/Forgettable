import React, { useState } from 'react';
import { Schema } from 'mongoose';

import api from './api';

import './App.css';

function App() {
  const [personID, setPersonID] = useState("");
  const [foundPerson, setFoundPerson]=useState("");
  const [showFoundPerson, setShowFoundPerson]=useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [interests, setInterests] = useState(new Array<string>());
  const [organisation, setOrganisation] = useState("");
  const [timeAdded, setTimeAdded] = useState(new Date());
  const [howWeMet, setHowWeMet] = useState("");
  const [encounters, setEncounters] = useState(new Array<string>());

  return (
    <div className="App">
      <form className="GET Person">
        <p>GET /person/:id</p>
        <input type="text" placeholder="personID" onChange={(e) => { setPersonID(e.currentTarget.value) }} />
        <br />
        <button type="button" onClick={ async() => {
          const foundPerson = await api.getPerson(personID);
          console.log(foundPerson);
          setFoundPerson(foundPerson.data.first_name);
          setShowFoundPerson(true);
        }} >Submit</button>
      </form>

      <form className="POST Person">
        <p>POST /person/create</p>
        <input type="text" placeholder="first_name" onChange={(e) => { setFirstName(e.currentTarget.value) }} />
        <br />
        <input type="text" placeholder="last_name" onChange={(e) => { setLastName(e.currentTarget.value) }} />
        <br />
        <input type="text" placeholder="birthday" disabled />
        <br />
        <input type="text" placeholder="interests" onChange={(e) => { setInterests(new Array<string>(e.currentTarget.value)) }} />
        <br />
        <input type="text" placeholder="organisation" onChange={(e) => { setOrganisation(e.currentTarget.value) }} />
        <br />
        <input type="text" placeholder="time_added" disabled />
        <br />
        <input type="text" placeholder="how_we_met" onChange={(e) => { setHowWeMet(e.currentTarget.value) }} />
        <br />
        <input type="text" placeholder="encounters" disabled />
        <br />
        <button type="button" onClick={async() => {
          const res = await api.createPerson({
            first_name: firstName,
            last_name: lastName,
            birthday: new Date(),
            interests: interests,
            organisation: organisation,
            time_added: timeAdded,
            how_we_met: howWeMet,
            encounters: null
          });

          console.log(res);
        }}>Submit</button>
      </form>

      {showFoundPerson && (<div>Found {foundPerson}! See console for more details.</div>)}
    </div>
  );
}

export default App;
