import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const Notification = ({message}) => {
  if(message === null){
    return null
  }

  return (
    <div className="error">
        {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2025</em>
    </div>
  )
}

function App(props) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note ...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id==id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote)
    .then(
      returnedNote => setNotes(notes.map(n => n.id === id ? returnedNote : n))
    )
    .catch(
      error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      }
    )
  }

  useEffect(() => {
    // console.log('effect')
    noteService.getAll()
    .then(initialNotes => setNotes(initialNotes))
  }, [])
  
  // console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)  
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    noteService.create(noteObject)
    .then(
      newNote => {
        setNotes(notes.concat(newNote))
        setNewNote("")
      }
    )
  }

  return (
    <>
     <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <ul>
        {/*Note: the key attribute is defined in <Note> instead of <li>*/}
        {notesToShow.map((note) => <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>)}
      </ul>
      <button onClick={() => {setShowAll(!showAll)}}>
        Show {showAll?"important":"all"}
      </button>
      <form onSubmit={addNote}>
        {/* Since we assigned a state to the input element, the input element is now controlled. */}
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
      <Footer/>
    </div>
    </>
  )
}

export default App
