import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref, onValue, remove, update } from 'firebase/database'
import '../styles/homepage.css'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import DoneIcon from '@mui/icons-material/Done'

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
    setIsEdit(false)
  }

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div className="homepage">
      <input
        className="add-edit-input"
        type="text"
        placeholder="Добавить заметку..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => {
        return (
          <div className="todo" key={todo.uidd}>
            <p>{todo.todo}</p>
            <EditIcon
              fontSize="large"
              className="edit-button"
              onClick={() => handleUpdate(todo)}
            />
            <DeleteForeverIcon
              fontSize="large"
              className="delete-button"
              onClick={() => handleDelete(todo.uidd)}
            />
          </div>
        )
      })}
      {isEdit ? (
        <div>
          <DoneIcon onClick={handleEditConfirm} className="add-confirm-icon" />
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
      <LogoutOutlinedIcon
        fontSize="large"
        onClick={handleSignOut}
        className="logout-icon"
      />
    </div>
  )
}

export default Homepage
