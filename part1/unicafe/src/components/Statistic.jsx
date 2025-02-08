export default function Statistic({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  const displayNone = <p>No feedback given</p>;

  const display = (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  );

  return (
    <div>
      <h1>statistics</h1>
      {total === 0 ? displayNone : display}
    </div>
  );
}
