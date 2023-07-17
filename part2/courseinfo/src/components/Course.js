const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  let arr = []
  parts.map(part => arr.push(part.exercises))
  let sum = arr.reduce((a, b) => a + b, 0)
  return(
    <p style={{ fontWeight: 'bold' }}>total of {sum} exercises</p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id}/> )}
  </>

const Course = ({course, parts}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }

export default Course