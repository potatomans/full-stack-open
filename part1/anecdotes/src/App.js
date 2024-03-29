import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const voteCopy = [...points]
  
  // determine anecdote with highest votes
  const sortCopy = [...points]
  sortCopy.sort(function(a, b){return b - a})
  let highestVote = points.indexOf(sortCopy[0])

  const printAnecdote = () => {
    // choose random anecdote
    let randInt = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(randInt)
  }

  const increaseVote = () => {
    voteCopy[selected] += 1
    setPoints(voteCopy) // data structures must be immutable
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={increaseVote}/>
      <Button text='next anecdote' handleClick={printAnecdote}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[highestVote]}
      <p>has {points[highestVote]} votes</p>
    </div>
  )
}

export default App
