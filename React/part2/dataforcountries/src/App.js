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

const Country = ({country}) => {
  
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
      <img src={country.flag} alt="flag" width="200"/>
      <CountryWeather country={country} />
    </div>
  )
}

const CountryWeather = ({country}) => {

  const [ weather, setWeather ] = useState()
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

  console.log('country', country)
  console.log('weather', weather)
  console.log('api_key', weather_api_key)
  console.log('env', process.env.REACT_APP_TITLE)
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital}`).then(response => {
      setWeather(response.data)
    })},[country.capital, weather_api_key])

  return typeof weather === 'undefined' ? (<></>) :
  (
    <>
    <h2>Weather in {country.capital}</h2>
      <div><b>Temperature:</b> {weather.current.temperature} Celsius</div>
      <img src={weather.current.weather_icons[0]} alt="weather" width="100"/>
      <div><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </>
  )
}

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
