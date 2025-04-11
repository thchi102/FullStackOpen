import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if((good+neutral+bad) === 0){
    return (
      <p>No feedback given.</p>
    )
  }
  else{
    return (
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good}/>
          <StatisticsLine text={"neutral"} value={neutral}/>
          <StatisticsLine text={"bad"} value={bad}/>
          <StatisticsLine text={"all"} value={(good + neutral + bad)}/>
          <StatisticsLine text={"average"} value={(good - bad)/(good + neutral + bad)}/>
          <StatisticsLine text={"positive"} value={good/(good + neutral + bad)+'%'}/>
        </tbody>
      </table>
    )
  }
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={() => {setGood(good+1)}} />
      <Button text="neutral" onClick={() => {setNeutral(neutral+1)}} />
      <Button text="bad" onClick={() => {setBad(bad+1)}}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
