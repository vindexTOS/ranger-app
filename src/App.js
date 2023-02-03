import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/log/SignIn'
import SignUp from './components/log/SignUp'
import About from './components/info/About'
import Main from './components/Main'
import AccountInfo from './components/AccountInfo'
import Entery from './components/Entery'
//context
import { MainContextProvider } from './context/MainContext'
import { PullUpContextProvider } from './context/PullUpContext'
import { SquatContextProvider } from './context/SquatContext'
import { AchievementProvider } from './context/AchievementContext'
import { NavContextProvider } from './context/NavBarContext'
//pages
import Navbar from './components/navigation/Navbar'
import Protectedroute from './components/protectedroute'
import Pushups from './components/pages/Pushups.page/Pushups'
import Pullups from './components/pages/Pullups.page/Pullups'
import Squats from './components/pages/Squat.page/Squats'
import Running from './components/pages/Running'
import StatsPage from './components/pages/Stats.page'
import HistoryPage from './components/pages/History.pages/History.page'
import Achivments from './components/pages/Achivments.page/Achivmens'
import MaxTestRoom from './components/pages/MaxTest/MaxTestRoom'
/// statistic graph imports
import PushUpStatMain from './components/pages/Statistic Graphs/pushup-stats/PushUpGrapgMain'
import PullUpGraphMain from './components/pages/Statistic Graphs/pullup-stats/PullupGraphMain'
import SquatGraphMain from './components/pages/Statistic Graphs/squating-stats/SquatGraphMain'
// users page
import UsersStatistics from './components/Other_users/UsersStatistics'
function App() {
  return (
    <MainContextProvider>
      {' '}
      <SquatContextProvider>
        <PullUpContextProvider>
          <NavContextProvider>
            <Navbar />
          </NavContextProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/account-info"
              element={
                <Protectedroute>
                  <AccountInfo />
                </Protectedroute>
              }
            />
            <Route
              path="/test"
              element={
                <Protectedroute>
                  <Entery />
                </Protectedroute>
              }
            />
            {/* main page routes and side nav */}
            <Route
              path="/workroom"
              element={
                <Protectedroute>
                  <Main />
                </Protectedroute>
              }
            >
              <Route path="user-stats" element={<UsersStatistics />} />
              <Route path="pushups" element={<Pushups />} />
              <Route path="pullups" element={<Pullups />} />
              <Route path="squats" element={<Squats />} />
              <Route path="running" element={<Running />} />
              <Route path="stats" element={<StatsPage />}>
                {/* stats page routes and navigation  */}
                <Route path="pushup-stats" element={<PushUpStatMain />} />
                <Route path="pullup-stats" element={<PullUpGraphMain />} />
                <Route path="squat-stats" element={<SquatGraphMain />} />
              </Route>
              <Route path="history" element={<HistoryPage />} />
              <Route
                path="achievements"
                element={
                  <AchievementProvider>
                    <Achivments />{' '}
                  </AchievementProvider>
                }
              />
              <Route path="testroom" element={<MaxTestRoom />} />
            </Route>
          </Routes>{' '}
        </PullUpContextProvider>
      </SquatContextProvider>
    </MainContextProvider>
  )
}

export default App
