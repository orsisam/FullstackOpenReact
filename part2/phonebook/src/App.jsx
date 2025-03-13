import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const initialPhoneBook = [
    {
      name: 'Isro Hidayatulloh',
      number: '12345678',
    },
    {
      name: 'August',
      number: '18182992',
    },
    {
      name: 'Budi',
      number: '8888575',
    },
    {
      name: 'Cindy',
      number: '99664829',
    },
  ];
  const [persons, setPersons] = useState(initialPhoneBook);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState([]);

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    console.log(event.target.value);
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
    // event.target.target = '';
    const name = newName;
    console.log(name);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setNewName('');
    setNewNumber('');
    // event.target.target = '';
    setPersons(initialPhoneBook);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;

    const hasName = persons.find((person) => person.name === name);
    const hasNumber = persons.find((person) => person.number === number);

    console.log(hasName);

    if (hasName) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    if (hasNumber) {
      alert(`Number ${number} is already added to phonebook`);
      return;
    }

    setPersons(() => {
      return [...persons, { name, number }];
    });
  };

  const displayOnPerson = (
    <>
      {persons.map((person) => (
        <li key={nanoid()}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );

  const displayOnFilter = (
    <>
      {filterPerson.map((person) => (
        <li key={nanoid()}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );

  console.log(filterPerson);

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
