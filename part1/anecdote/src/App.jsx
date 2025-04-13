import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const AnecdoteWithMostVote = ({anecdotes, votes}) => {
  if(votes.indexOf(Math.max(...votes)) === 0){
    return (
      <p>No anecdote has been voted yet.</p>
    )
  }
  else{
    return (
      <>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
      </>
    )
  }
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setRandomNumber = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const addVote = () => {
    const copy = [...votes]
    copy[selected]+=1
    setVotes(copy)
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={addVote} text="Vote"/>
      <Button onClick={setRandomNumber} text="Next anecdote"/> 
      
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
