import { useState } from 'react';
import { anecdotes } from './data/Anecdote';
import Button from './components/Button';

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVoted = votes.indexOf(Math.max(...votes));

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const handleAnecdote = () => {
    setSelected(() => Math.floor(Math.random() * anecdotes.length));
  };

  const displayNoMostVoted = <p>No anecdote has been voted</p>;
  const displayOnVoted = (
    <>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </>
  );

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='Vote' onClick={handleVote} />
      <Button text={'Next anecdote'} onClick={handleAnecdote} />

      <h1>Anecdote with most votes</h1>
      {votes[mostVoted] === 0 ? displayNoMostVoted : displayOnVoted}
    </div>
  );
};

export default App;
