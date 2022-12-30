import React from 'react'
import Welcome from './components/Welcome'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/notes-with-auth" element={<Welcome />} />
          <Route path="/notes-with-auth/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
