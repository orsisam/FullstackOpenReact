import { useState, useEffect } from 'react';
import {
  getAll as getPersons,
  create as createPerson,
} from './services/request.js';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState([]);

  useEffect(() => {
    getPersons().then((contacts) => setPersons(contacts));
  }, []);

  const onChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onChangeFilter = (event) => {
    let filteredPerson = [];
    if (event.target.value.length > 0) {
      filteredPerson = persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilterPerson(filteredPerson);
    }
    setFilterPerson(filteredPerson);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setNewName('');
    setNewNumber('');
  };

  const handleReset = (event) => {
    event.preventDefault();
    setNewName('');
    setNewNumber('');

    getPersons().then((persons) => {
      console.log(persons);
      setPersons(() => persons);
    });
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;

    const hasName = persons.find((person) => person.name === name);
    const hasNumber = persons.find((person) => person.number === number);

    if (hasName) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    if (hasNumber) {
      alert(`Number ${number} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name,
      number,
    };

    createPerson(newPerson).then((returnedObject) => {
      setPersons((oldPersons) => [...oldPersons, returnedObject]);
      setNewName('');
      setNewNumber('');
    });
  };

  const displayOnPerson = (
    <>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );

  const displayOnFilter = (
    <>
      {filterPerson.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type='text' onChange={onChangeFilter} />
      </div>
      <h2>add a new</h2>
      <form action=''>
        <div>
          name: <input onChange={onChangeName} value={newName} />
        </div>
        <div>
          number:
          <input type='number' onChange={onChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type='submit' onClick={handleSumbit}>
            add
          </button>
          <button type='reset' onClick={handleReset}>
            reset
          </button>
          <button type='submit' onClick={handleClear}>
            clear
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>{filterPerson.length > 0 ? displayOnFilter : displayOnPerson}</ul>
      </div>
      ...
    </div>
  );
}

export default App;
