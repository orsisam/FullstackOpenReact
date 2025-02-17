import Note from './components/Notes';
import { notes as savedNotes } from './data/notes';
import { useState } from 'react';
import { nanoid } from 'nanoid';

const App = () => {
  const [notes, setNotes] = useState(savedNotes);

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={nanoid()} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
