import React, { useState } from 'react'

const Filter = ({filter, handleFilter}) => (
  <div>Filter shown with <input onChange={handleFilter} value={filter} /></div>
)

const PersonsForm = ({name, handleName, number, handleNumber, handleSubmit}) => (
  <form>
    <div>
      name: <input onChange={handleName} value={name}/>
      </div>
      <div>
        number: <input onChange={handleNumber} value={number}/>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  </form>
)

const Persons = ({persons}) => (
  <ul>
    {persons.map(person => <Person key={person.name} person={person} />)}
  </ul>
)

const Person = ({person}) => (
  <li key={person.name}>{person.name} {person.number}</li>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
      number: '012-3456789' 
    },
    { name: 'Ivana Hellas', 
      number: '012-3456789' 
    },
    { name: 'Georg Brogh', 
      number: '012-3456789' 
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  // Button Handlers
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === newName ).length > 0) {
      alert(`${newName} is already in the Phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  // Input State Handlers
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  // Helper functions
  const filterPersons = () => {
    return persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) === -1 ? false : true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilter={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonsForm name={newName} handleName={handleNewName} 
                   number={newNumber} handleNumber={handleNewNumber} 
                   handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} />
    </div>
  )
}

export default App