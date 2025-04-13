const Header = (props) => {
    return (
      <h1>{props.name}</h1>
    )
  }
  
const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
const Content = (props) => {
    return (
      <div>
        {props.parts.map((x) => <Part key={x.id} part={x}/>)}
      </div>
    )
  }
  
const Total = (props) => {
    return (
      <p>
        Number of Exercise
        {props.parts.reduce((total, part) => total+part.exercises, 0)}
      </p>
    )
  }

const Course = ({courses}) => {
    return (
        <>
        {courses.map((course) => {
            return (
                <div key={course.id}>
                    <Header name={course.name}/>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts}/>
                </div>
            )
        })}
        </>
    )

}

export default Course