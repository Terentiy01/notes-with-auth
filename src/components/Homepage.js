import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Homepage() {
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

  return (
    <div>
      <h1>test</h1>
      <button onClick={handleSignOut}>Выйти</button>
    </div>
  )
}

export default Homepage
