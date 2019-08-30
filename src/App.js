import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './Note'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('Add name')
  const [ newNumber, setNewNumber ] = useState('Add number')
  const [ newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const rows = () => persons.map(person =>
    <Note 
      name={person.name}
      number={person.number}
      />
  )

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewFilter(event.target.value)
    const flags = 'gi'
    const regex = new RegExp(`${newFilter}`, flags)
    const filt = person => person.name.match(regex)
    setPersons(persons.filter(filt))
  }

  /*const filterPersons = (event) => {
    event.preventDefault()
    const filt = person => person.name === newFilter
    setPersons(persons.filter(filt))
  }*/


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addDetail = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const contain = person => person.name === newName

    if (persons.some(contain)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
        filter shown with: <input defaultValue={newFilter} onChange={handleFilterChange} />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addDetail}>
        <div>
          name: <input defaultValue={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input defaultValue={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        <h2>Numbers</h2>
        <div>
          <ul>
            {rows()}
          </ul>
        </div>


      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App