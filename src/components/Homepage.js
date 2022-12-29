import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref } from 'firebase/database'

function Homepage() {
  const [todo, setTodo] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
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

  return (
    <div>
      <input
        type="text"
        placeholder="Добавить заметку..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={writeToDatabase}>Добавить</button>
      <button onClick={handleSignOut}>Выйти</button>
    </div>
  )
}

export default Homepage
