import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const initialPhoneBook = [
    {
      name: 'Isro Hidayatulloh',
    },
  ];
  const [persons, setPersons] = useState(initialPhoneBook);

  const [newName, setNewName] = useState('');

  const onChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = newName;

    const hasName = persons.find((person) => person.name === name);

    console.log(hasName);

    if (hasName) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    setPersons(() => {
      return [...persons, { name }];
    });
  };

  const handleClear = (event) => {
    event.preventDefault();
    setNewName('');
    event.target.target = '';
    const name = newName;
    console.log(name);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setNewName('');
    event.target.target = '';
    setPersons(initialPhoneBook);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form action=''>
        <div>
          name: <input onChange={onChangeName} value={newName} />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit}>
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
        <ul>
          {persons.map((person) => (
            <li key={nanoid()}>{person.name}</li>
          ))}
        </ul>
      </div>
      ...
    </div>
  );
}

export default App;
