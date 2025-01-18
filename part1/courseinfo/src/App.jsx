const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a compnent',
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Part = ({ name, exercise }) => {
    return (
      <>
        <p>
          {name} {exercise}
        </p>
      </>
    );
  };

  const Content = ({ parts }) => {
    return (
      <>
        <Part name={parts[0].name} exercise={parts[0].exercises} />
        <Part name={parts[1].name} exercise={parts[1].exercises} />
        <Part name={parts[2].name} exercise={parts[2].exercises} />
      </>
    );
  };

  const Total = ({ exercise1, exercise2, exercise3 }) => {
    return (
      <>
        <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
      </>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        exercise1={course.parts[0].exercises}
        exercise2={course.parts[1].exercises}
        exercise3={course.parts[2].exercises}
      />
    </div>
  );
};

export default App;
