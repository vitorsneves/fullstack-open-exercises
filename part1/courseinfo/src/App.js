const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        numberOfExercises: 10,
      },
      {
        name: "Using props to pass data",
        numberOfExercises: 7,
      },
      {
        name: "State of a component",
        numberOfExercises: 14,
      },
    ],
  };

  const getTotalOfExercises = (parts) => {
    const total = parts.reduce((a, b) => a + b.numberOfExercises, 0);

    return total;
  };

  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <p>
            {part.name} {part.numberOfExercises}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ total }) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={getTotalOfExercises(course.parts)} />
    </div>
  );
};

export default App;
