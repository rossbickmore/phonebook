import React, { useState } from 'react'
import Note from './Note'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('Add name')

  const rows = () => persons.map(person =>
    <Note 
      name={person.name}
      />
  )

  /* addName function that changes the state by adding a name to persons*/

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      id: persons.length + 1,
    }

    const contain = person => person.name === newName

    if (persons.some(contain)) {
      window.alert(newName + ' is already added to phonebook');
    } else {
      setPersons(persons.concat(noteObject))
      setNewName('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input defaultValue={newName} onChange={handleNameChange} />
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
      <div>debug: {newName}</div>
    </div>
  )
}

export default App