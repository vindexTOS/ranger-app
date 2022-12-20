import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import Main from './components/Main'
import { MainContextProvider } from './context/MainContext'

function App() {
  return (
    <MainContextProvider>
      {' '}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </MainContextProvider>
  )
}

export default App