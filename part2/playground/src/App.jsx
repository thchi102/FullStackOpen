import { useState } from 'react'
import Note from './components/Note'

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("a new note ...")
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)  
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: String(notes.length+1),
      content: newNote,
      important: Math.random() < 0.5
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  return (
    <>
     <div>
      <h1>Notes</h1>
      <ul>
        {/*Note: the key attribute is defined in <Note> instead of <li>*/}
        {notesToShow.map((note) => <Note key={note.id} note={note}/>)}
      </ul>
      <button onClick={() => {setShowAll(!showAll)}}>
        Show {showAll?"important":"all"}
      </button>
      <form onSubmit={addNote}>
        {/* Since we assigned a state to the input element, the input element is now controlled. */}
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
    </>
  )
}

export default App
