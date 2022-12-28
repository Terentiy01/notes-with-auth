import React, { useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage')
      })
      .catch((err) => alert(err.message))
  }

  const handleRegister = () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }
    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password
    )
      .then(() => {
        navigate('/homepage')
      })
      .catch((err) => alert(err.message))
  }

  return (
    <div className="welcome">
      <h1>Todo-list</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Введите email"
              value={registerInfo.email}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={registerInfo.password}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={registerInfo.confirmPassword}
              onChange={(e) =>
                setRegisterInfo({
                  ...registerInfo,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={handleRegister}>Регистрация</button>
            <button onClick={() => setIsRegistering(false)}>Вернуться</button>
          </>
        ) : (
          <>
            <input type="email" onChange={handleEmailChange} value={email} />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button onClick={handleSignIn}>Войдите</button>
            <button onClick={() => setIsRegistering(true)}>
              Зарегистрироваться
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Welcome
