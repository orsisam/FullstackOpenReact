import { course } from './data/course';
import Course from './components/Course';

const App = () => {
  return (
    <>
      {course.map((course) => (
        <Course key={course.id} header={course.name} parts={course.parts} />
      ))}
    </>
  );
};

export default App;
