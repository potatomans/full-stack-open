import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

const SuccessNotification = ({message}) => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }
  else {
    return (
      <div style={success}>
        {message}
      </div>
    )
  }
}

const ErrorNotification = ({message}) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }
  else {
    return (
      <div style={error}>
        {message}
      </div>
    )
  }
}

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

const PersonForm = ({persons, setPersons, filteredPersons, setFilteredPersons, setSuccessMessage, setErrorMessage}) => {
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

    // create a copy of the object
    const oldPerson = persons.filter(person => person.name === newName)

    if (oldPerson.length !== 0) {
      // add window.confirm
      if (window.confirm(`${newName} is already added to the phonebook, replace the older number with a new one?`)) {
        const url = `http://localhost:3001/api/persons/${oldPerson[0].id}`

        // change the number
        oldPerson[0].number = newNum

        // update the server, setPersons and setFilteredPersons
        axios.put(url, oldPerson[0]).then(response => {
          setPersons(persons.map(person => person.name === newName ? response.data : person))
          setFilteredPersons(persons.map(person => person.name === newName ? response.data : person))
        })
        .catch(() => {
          setErrorMessage(
            `Note: ${newName} has already been removed`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNum
      }

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setFilteredPersons(filteredPersons.concat(response)) // not [ ...persons ] due to lag in updating state
          setNewName('')
          setNewNum('')
          setSuccessMessage(`Added ${newName} successfully`)
          setTimeout(() => setSuccessMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setSuccessMessage(null), 5000)
        })
    }
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

const DeleteButton = ({name, id, persons, setPersons, setFilteredPersons}) => {
  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3001/api/persons/${id}`)
        .then(() => {
          const tempPersons = persons.filter(person => person.id !== id)
          setPersons(tempPersons)
          setFilteredPersons(tempPersons) // this must be included for filteredPersons's state to be refreshed (since names are dependent on filteredPersons and not Persons)
        })
    }
  }
  return (
    <button type="submit" onClick={handleDelete}>delete</button>
  )
}

const Persons = ({filteredPersons, persons, setPersons, setFilteredPersons}) => {
  if (filteredPersons.length === 0) {
    return (
      persons.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton setFilteredPersons={setFilteredPersons} name={person.name} id={person.id} persons={persons} setPersons={setPersons}/></p>)
    )
  }
  else {
    return (
      filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <DeleteButton setFilteredPersons={setFilteredPersons} name={person.name} id={person.id} persons={persons} setPersons={setPersons}/></p>)
    )
  }
}

const App = () => {
  // state definitions
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} filteredPersons={filteredPersons} setFilteredPersons={setFilteredPersons} setSuccessMessage={setSuccessMessage} setErrorMessage = {setErrorMessage}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons}/>
    </div>
  )
}

export default App
