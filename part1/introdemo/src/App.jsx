import React from 'react';

const App = () => {
  const Hello = (props) => {
    return (
      <div>
        <p>
          Hello {props.name}, you are {props.age} years old
        </p>
      </div>
    );
  };

  const name = 'Hariyono';
  const age = 16;

  return (
    <div>
      <p>Greetings</p>
      <Hello name='John' age={10 + 30} />
      <Hello name={name} age={age} />
    </div>
  );
};

export default App;
