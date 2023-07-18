import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({persons, setFilteredPersons}) => {
  const [newFilter, setNewFilter] = useState('')

  const handleSearch = (event) => {
    setNewFilter(event.target.value)

    // maybe try search[0] === name[i] and search[1] === name[i + 1]? then increment i?
    setFilteredPersons(persons.filter(person => {
      let arr = person.name.toLowerCase().split('')
      let searchArr = event.target.value.toLowerCase().split('') // use event.target.value instead of newFilter since it takes time for state to be updated
      for (let i = 0; i < arr.length; i++) {
        if (searchArr[0] === arr[i]) { // seems like it only works for 3 characters and above
          if (searchArr.length === 1) {
            return true
          }
          else {
            for (let j = 1; j < searchArr.length; j++) {
              if (searchArr[j] !== arr[i + j]) {
                break
              }
              else if (j === searchArr.length - 1) {
                return true
              }
            }
          }
        }
      }
      return false
    }))
  }
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleSearch}/>
    </div>
  )
}

const PersonForm = ({persons, setPersons, filteredPersons, setFilteredPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()

    // check if name is already in phonebook
    if (persons.filter(person => person.name === newName).length !== 0) {
      return (
        alert(`${newName} is already added to the phonebook`)
      )
    }

    const newPerson = {
      name: newName,
      number: newNum
    }
    setPersons(persons.concat(newPerson))
    setFilteredPersons(filteredPersons.concat(newPerson)) // not [ ...persons ] due to lag in updating state
    setNewName('')
    setNewNum('')
  }

return (
  <form>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNum} onChange={handleNumChange} />
    </div>
    <div>
      <button type="submit" onClick={handleClick}>add</button>
    </div>
  </form>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  // state definitions
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([ ...persons ])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} filteredPersons={filteredPersons} setFilteredPersons={setFilteredPersons}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
