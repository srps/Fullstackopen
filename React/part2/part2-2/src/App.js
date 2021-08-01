import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => {
        setNotes(response.data);
      })
  }, [])
  console.log('rendering', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleChangeNote = (event) => {
    setNewNote(event.target.value)
  }

  const handleShowNotes = (event) => {
    setShowAll(!showAll) 
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notes.filter(note => showAll ? true : note.important === true).map(note => 
            <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChangeNote}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App