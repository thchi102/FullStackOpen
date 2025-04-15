import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((promise) => setPersons(promise.data))
  }, [])

  const addNewContact = (event) => {
      event.preventDefault()
      const newPerson = {
        name: newName,
        number: newPhoneNum,
        id: persons.length+1
      }
      if(persons.findIndex((x) => x.name === newPerson.name) !== -1){
        alert(`${newName} is already added to the phonebook.`)
      }
      else if(persons.findIndex((x) => x.number === newPerson.number) !== -1){
        alert(`${newPhoneNum} is already added to the phonebook.`)
      }
      else{
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewPhoneNum('')
      }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handlePhoneNumChange = (event) => {
    setNewPhoneNum(event.target.value)
  }

  const handleFilterName = (event) => {
      setFilterName(event.target.value)
      setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterName={handleFilterName}/>

      <h2>Add a new contact</h2>

      <PersonForm addNewContact={addNewContact} newName={newName} newPhoneNum={newPhoneNum}
                  handleNameChange={handleNameChange} handlePhoneNumChange={handlePhoneNumChange}/>

      <h2>Numbers</h2>

      <Persons persons={persons}/>
    </div>
  )
}

export default App
