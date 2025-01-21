export default function Total({ parts }) {
  const exercises = parts.map((part) => part.exercises);
  const exerciseTotal = exercises.reduce((a, b) => a + b, 0);

  return <p>Number of exercises {exerciseTotal}</p>;
}
