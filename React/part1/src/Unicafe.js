import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td><b>{text}</b></td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  return all === 0 ? <div>No feedback has been given</div> : (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={(good - bad) / all} />
        <Statistic text="Positive" value={`${good * 100 / all}%`} />
      </tbody>
    </table>
  )
}

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={incrementGood()} text="Good"/>
      <Button handleClick={incrementNeutral()} text="Neutral" />
      <Button handleClick={incrementBad()} text="Bad" />
      <></>
      <h2>Statistics</h2>
      <></>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App