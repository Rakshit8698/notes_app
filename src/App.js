import NotesList from "./components/NotesList";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import Header from './components/Header'

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'this is my first note',
      date: "15/04/2021"
    },
    {
      id: nanoid(),
      text: 'this is my second note',
      date: "21/04/2021"
    },
    {
      id: nanoid(),
      text: 'this is my third note',
      date: "18/04/2021"
    }
  ])

  const [searchText, setSearchText] = useState('');

  const [darkmode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
    );  //to retrive the data
    //whenever the app is going to load its going to retrive the data from the local storage that has this key-->'react-notes-app-data'


    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [])





  //this effect is going to save our note to  a local storage any time the notes change
  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));

  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes)
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  return (
    <div className={`${darkmode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote={deleteNote} />
      </div>
    </div>
  )
};

export default App;