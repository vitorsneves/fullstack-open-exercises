const App = () => {
  const courseInformation = {
    title: "Half Stack application development",
    content: {
      part1: {
        name: "Fundamentals of React",
        numberOfExercises: 10,
      },
      part2: {
        name: "Using props to pass data",
        numberOfExercises: 7,
      },
      part3: {
        name: "State of a component",
        numberOfExercises: 14,
      },
    },
  };

  const getTotalOfExercises = (content) => {
    let total = 0;

    for (const part in content) {
      total += content[part].numberOfExercises;
    }

    return total;
  };

  const formatContent = (content) => {
    const formatedContent = [];

    for (const part in content) {
      const partInfo = content[part];

      formatedContent.push(
        <p>
          {partInfo.name} {partInfo.numberOfExercises}
        </p>
      );
    }

    return formatedContent;
  };

  const Header = ({ title }) => {
    return <h1>{title}</h1>;
  };

  const Content = ({ content }) => {
    return <>{formatContent(content)}</>;
  };

  const Total = ({ total }) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header title={courseInformation.title} />
      <Content content={courseInformation.content} />
      <Total total={getTotalOfExercises(courseInformation.content)} />
    </div>
  );
};

export default App;
