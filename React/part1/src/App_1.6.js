import React, { useState } from 'react'

const Display = ({text, counter}) => <div><b>{text}</b> {counter}</div>

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
      <Button handleClick={incrementBad()}text="Bad" />
      <></>
      <h2>Statistics</h2>
      <></>
      <Display text="Good" counter={good} />
      <Display text="Neutral" counter={neutral} />
      <Display text="Bad" counter={bad} />
    </div>
  )
}

export default App