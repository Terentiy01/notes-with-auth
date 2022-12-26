import React from 'react'

function Welcome() {
  return (
    <div className="welcome">
      <h1>Todo-list</h1>
      <div className="login-container">
        <input type="email" />
        <input type="password" />
        <button>Войдите</button>
        <a href="">Зарегистрироваться</a>
      </div>
    </div>
  )
}

export default Welcome
