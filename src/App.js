import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import About from './components/info/About'
import Main from './components/Main'
import Entery from './components/Entery'
import { MainContextProvider } from './context/MainContext'

function App() {
  return (
    <MainContextProvider>
      {' '}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Entery />} />
      </Routes>
    </MainContextProvider>
  )
}

export default App
