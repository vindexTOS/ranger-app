import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import About from './components/info/About'
import Main from './components/Main'
import Entery from './components/Entery'
import StatsPage from './components/pages/Stats.page'
import { MainContextProvider } from './context/MainContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <MainContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/test" element={<Entery />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </MainContextProvider>
  )
}

export default App
