import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import About from './components/info/About'
import Main from './components/Main'
import Entery from './components/Entery'
import { MainContextProvider } from './context/MainContext'
import Navbar from './components/Navbar'
import Protectedroute from './components/protectedroute'
import Workoutroom from './components/Workoutroom'
import Pullups from './components/pages/Pullups'
import Squats from './components/pages/Squats'
import Running from './components/pages/Running'
import StatsPage from './components/pages/Stats.page'

import HistoryPage from './components/pages/History.page'
import Achivments from './components/pages/Achivmens'

function App() {
  return (
    <MainContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/workroom"
          element={
            <Protectedroute>
              <Main />
            </Protectedroute>
          }
        >
          <Route path="pushups" element={<Workoutroom />} />{' '}
          <Route path="pullups" element={<Pullups />} />
          <Route path="squats" element={<Squats />} />
          <Route path="running" element={<Running />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="achivments" element={<Achivments />} />
        </Route>

        <Route
          path="/test"
          element={
            <Protectedroute>
              <Entery />
            </Protectedroute>
          }
        />
      </Routes>
    </MainContextProvider>
  )
}

export default App
