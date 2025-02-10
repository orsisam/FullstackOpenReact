import { course } from './data/course';
import Course from './components/Course';

const App = () => {
  return (
    <>
      <Course header={course.name} parts={course.parts} />
    </>
  );
};

export default App;
