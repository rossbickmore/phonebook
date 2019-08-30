import React, { useState } from 'react'
import Note from './Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('Add name')
  const [ newNumber, setNewNumber ] = useState('Add number')
  const [ newFilter, setNewFilter] = useState('')
  const rows = () => persons.map(person =>
    <Note 
      name={person.name}
      number={person.number}
      />
  )

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filterPersons = (event) => {
    event.preventDefault()
    const filt = person => person.name === newFilter
    setPersons(persons.filter(filt))
  }


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
      <form onSubmit={filterPersons}>
        <div>
        filter shown with: <input defaultValue={newFilter} onChange={handleFilterChange} />
        </div>
        <div>
          <button type="submit">filter</button>
        </div>  
      </form>
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