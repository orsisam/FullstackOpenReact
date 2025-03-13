import { useState } from 'react';
import Note from './components/Note';
import { nanoid } from 'nanoid';

const App = ({ notes }) => {
  const [currNotes, setCurrNotes] = useState(notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: nanoid(),
    };

    setCurrNotes((currNotes) => [...currNotes, noteObject]);
    setNewNote('');
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? currNotes
    : currNotes.filter((note) => note.important === true);

  const toggleShow = () => {
    setShowAll((currStatus) => !currStatus);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={toggleShow}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
