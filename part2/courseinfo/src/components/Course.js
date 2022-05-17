import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const getTotalOfExercises = (course) =>
    course.parts.reduce(
      (acumulator, { exercises }) => acumulator + exercises,
      0
    );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={getTotalOfExercises(course)} />
    </div>
  );
};

export default Course;
