/* eslint-disable react/prop-types */
const Hello = (props) => {
  // Component helper function
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>Jadi anda mungkin lahie pada tahun {bornYear()}</p>
    </div>
  );
};

export default Hello;
