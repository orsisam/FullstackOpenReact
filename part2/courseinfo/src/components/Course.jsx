import Header from './Header';
import Content from './Content';
import Total from './Total';

/* eslint-disable react/prop-types */
const Course = ({ header, parts }) => {
  //   console.log(header, parts);
  return (
    <div>
      <Header title={header} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
