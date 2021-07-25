import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ getAnecdote, getVote, index }) => (
  <>
    <div>{getAnecdote(index)}</div>
    <div>Has {getVote(index)} votes</div>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)
  );
  const [mostVoted, setMostVoted] = useState(0);

  const selectRandomAnecdote = () => {
    const newSelectedRandom = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelectedRandom);
  };

  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    if (mostVoted < newVotes[selected]) {
        setMostVoted(selected)
    }
  };

  const getAnecdote = (index) => anecdotes[index];
  const getVote = (index) => votes[index];

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote index={selected} getAnecdote={getAnecdote} getVote={getVote} />
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={selectRandomAnecdote} text="Next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote index={mostVoted} getAnecdote={getAnecdote} getVote={getVote} />
    </>
  );
};

export default App;
