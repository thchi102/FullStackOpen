import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const baseURL = "http://localhost:3001/persons"

  useEffect(() => {
    personService.get()
    .then(returned => setPersons(returned))
  }, [])

  const addNewContact = (event) => {
      event.preventDefault()
      const newPerson = {
        name: newName,
        number: newPhoneNum
      }
      if(persons.findIndex((x) => x.name === newPerson.name) !== -1){
        const confirm = window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
        const id = persons.find(p => p.name === newPerson.name).id
        if(confirm){
          personService.update(id, newPerson)
          .then(
            returned => setPersons(persons.map(p => p.id !== id ? p : returned))
          )
        }
      }
      else if(persons.findIndex((x) => x.number === newPerson.number) !== -1){
        alert(`${newPhoneNum} is already added to the phonebook.`)
      }
      else{
        personService.create(newPerson)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewPhoneNum('')
        })
      }
  }

  const getPersonNameById = (id) => {
    return persons.find(p => p.id === id).name
  }

  const deleteContact = (id) => {
    const confirm = window.confirm(`Delete ${getPersonNameById(id)}?`) 
    if(confirm){
      personService.remove(id)
      .then(
        () => {
          setPersons(persons.filter(p => p.id !== id))
        }
      )
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

      <Persons persons={persons} handleDelete={deleteContact}/>
    </div>
  )
}

export default App
