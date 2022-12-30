import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref, onValue, remove, update } from 'firebase/database'
import '../styles/homepage.css'

function Homepage() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUidd, setTempUidd] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo])
            })
          }
        })
      } else if (!user) {
        navigate('/')
      }
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate('/'))
      .catch((err) => alert(err.message))
  }

  const writeToDatabase = () => {
    const uidd = uid() // 8asjndjk7gfkas5
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    })

    setTodo('')
  }

  const handleUpdate = (todo) => {
    setIsEdit(true)
    setTodo(todo.todo)
    setTempUidd(todo.uidd)
  }

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    })

    setTodo('')
  }

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Добавить заметку..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => {
        return (
          <div key={todo.uidd}>
            <h1>{todo.todo}</h1>
            <button onClick={() => handleUpdate(todo)}>Изменить</button>
            <button onClick={() => handleDelete(todo.uidd)}>Удалить</button>
          </div>
        )
      })}
      {isEdit ? (
        <div>
          <button onClick={handleEditConfirm}>Подтвердить</button>
        </div>
      ) : (
        <div>
          <button onClick={writeToDatabase}>Добавить</button>
        </div>
      )}
      <button onClick={handleSignOut}>Выйти</button>
    </div>
  )
}

export default Homepage
