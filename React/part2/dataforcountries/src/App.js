import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilter}) => (
  <div>Find countries <input onChange={handleFilter} value={filter} /></div>
)

const Countries = ({countries, setFilter}) => {

  const showCountryDetail = (country) => setFilter(country.name)

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  return (
    <ul>
      {countries.map(country => (
          <li key={country.alpha3Code}>{country.name} <button onClick={() => showCountryDetail(country)}>Show</button></li>
      ))}
    </ul>
  )
}

const Country = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
    <img src={country.flag} alt="flag" width="200"/>
  </div>
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
