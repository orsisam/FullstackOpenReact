import { useState, useEffect } from 'react';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes((oldNotes) => [...oldNotes, returnedNote]);
        setNewNote('');
      })
      .catch(() => console.log('failed to get data'));
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleShow = () => {
    setShowAll((currStatus) => !currStatus);
  };

  const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important';

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    );
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes((oldNotes) => {
          return oldNotes.map((note) => (note.id !== id ? note : updatedNote));
        });
        setNewNote('');
      })
      .catch(() => {
        alert(`the note'${note.content}' wal already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder='a new note...'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
