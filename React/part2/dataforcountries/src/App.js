import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Countries } from './components/Countries'

const Filter = ({filter, handleFilter}) => (
  <div>Find countries <input onChange={handleFilter} value={filter} /></div>
)

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }
  
  // Helper functions
  const filterCountries = () => {
    return countries.filter(country => country.name.toLowerCase().indexOf(newFilter.toLowerCase()) === -1 ? false : true)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })},[])

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={newFilter} handleFilter={handleNewFilter} />
      <Countries countries={filterCountries()} setFilter={setNewFilter} />
    </div>
  )
}

export default App;
