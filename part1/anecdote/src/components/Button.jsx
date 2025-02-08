/* eslint-disable react/prop-types */
export default function Button({ text, onClick }) {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
}
