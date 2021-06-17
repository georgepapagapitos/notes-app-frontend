import React, { useState, useEffect, useRef } from 'react';

import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Toggle from './components/Toggle';

import noteService from './services/notes';
import loginService from './services/login';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAllNotes()
      .then(response => {
        setNotes(response);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .createNote(noteObject)
      .then(response => {
        setNotes(notes.concat(response));
      });
  };

  const deleteNote = (id) => {
    noteService
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(() => {
        setErrorMessage('error deleting note');
      });
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .updateNote(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login(
        username, password
      );
      noteService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      setUser(user);
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Toggle buttonLabel="log in">
      <LoginForm login={login} />
    </Toggle>
  );

  const noteFormRef = useRef();

  const noteForm = () => (
    <Toggle buttonLabel="add a note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Toggle>
  );

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
      }

      {notes.length !== 0 && <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>}

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            deleteNote={() => deleteNote(note.id)}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default App;