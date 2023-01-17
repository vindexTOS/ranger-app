import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import About from './components/info/About'
import Main from './components/Main'
import Entery from './components/Entery'
import { MainContextProvider } from './context/MainContext'
import { PullUpContextProvider } from './context/PullUpContext'
import { SquatContextProvider } from './context/SquatContext'
import Navbar from './components/navigation/Navbar'
import Protectedroute from './components/protectedroute'
import Pushups from './components/pages/Pushups.page/Pushups'
import Pullups from './components/pages/Pullups.page/Pullups'
import Squats from './components/pages/Squat.page/Squats'
import Running from './components/pages/Running'
import StatsPage from './components/pages/Stats.page'
import HistoryPage from './components/pages/History.page'
import Achivments from './components/pages/Achivmens'
/// statistic graph imports
import PushUpStatMain from './components/pages/Statistic Graphs/pushup-stats/PushUpGrapgMain'

function App() {
  return (
    <MainContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        {/* main page routes and side nav */}
        <Route
          path="/workroom"
          element={
            <Protectedroute>
              <SquatContextProvider>
                <PullUpContextProvider>
                  <Main />
                </PullUpContextProvider>
              </SquatContextProvider>
            </Protectedroute>
          }
        >
          <Route path="pushups" element={<Pushups />} />{' '}
          <Route path="pullups" element={<Pullups />} />
          <Route path="squats" element={<Squats />} />
          <Route path="running" element={<Running />} />
          <Route path="stats" element={<StatsPage />}>
            {/* stats page routes and navigation  */}
            <Route path="pushup-stats" element={<PushUpStatMain />} />
          </Route>
          <Route path="history" element={<HistoryPage />} />
          <Route path="achievements" element={<Achivments />} />
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
