import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, textAfter}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td> 
      <td>{textAfter}</td>
    </tr> // note that this is enclosed in tr and not div, since div wouldnt work
  )
}

const Statistics = ({good, neutral, bad}) => {

  let all = good + neutral + bad
  let average = (good * 1 - bad * 1) / all
  let positive = good / all * 100

  return (
  <div>
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} textAfter='%'/>
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <div>No feedback given</div>
    </div>)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
