const Hello = (props) => {
  return (
    <div>
      <p>Hello, {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const name  = 'Peter'
  const age = 20
  return (
    <div>
      <p>Hello world</p>
      <Hello name = 'Jonathan' age = {21}/>
      <Hello name = {name} age={age}/>
    </div>
  ) 
}

export default App