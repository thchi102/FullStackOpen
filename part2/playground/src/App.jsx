import { useState } from 'react'
import Note from './components/Note'


function App({notes}) {
  const [count, setCount] = useState(0)
  return (
    <>
     <div>
      <h1>Notes</h1>
      <ul>
        {/*Note: the key attribute is defined in <Note> instead of <li>*/}
        {notes.map((note) => <Note key={note.id} note={note}/>)}
      </ul>
    </div>
    </>
  )
}

export default App
