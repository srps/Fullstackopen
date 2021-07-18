import React, { useState } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>the app is used by pressing the butts</div>
    )
  }
  return (
    <div>butt press history: {props.allClicks.join(' ')}</div>
  )
}

const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => {
    console.log('hello', who)
  }

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button handleClick={setToValue(1000)} text="thousand"/>
      <Button handleClick={setToValue(0)} text="reset" />
      <Button handleClick={setToValue(value + 1)}text="increment" />
    </div>
  )
}

export default App