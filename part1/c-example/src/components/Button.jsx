/* eslint-disable react/prop-types */
const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

export default Button;
