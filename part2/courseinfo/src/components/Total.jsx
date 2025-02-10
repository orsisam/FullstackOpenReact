/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  const exerciseTotal = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <p>
      <b>Number of {exerciseTotal} exercises</b>
    </p>
  );
};
export default Total;
