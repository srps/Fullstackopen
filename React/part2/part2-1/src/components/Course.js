import React from "react";

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
        <ul>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </ul>
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</b>
    </p>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
