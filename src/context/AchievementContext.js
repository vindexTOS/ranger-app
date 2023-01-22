import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { MainUseContext } from './MainContext'
import { PullUpUseContext } from './PullUpContext'
import { SquatUseContext } from './SquatContext'

const AchievementContext = createContext()
export const AchievementProvider = ({ children }) => {
  // pulling data from other contexsts //////////////////////////////////
  const { pushupUid, totalPushups } = MainUseContext()
  const { pullupUid, totalPullUps } = PullUpUseContext()
  const { squatUid, totalSquats } = SquatUseContext()
  /// States for award functions ////////////////////////////////
  // first steps awrad state ////////////////
  const [firstStepsAward, setFirstStepsAward] = useState(0)
  // commited award state and var //////////////////////////////
  let commitedAwardCounter = 0
  const [commitedAward, setCommitedAward] = useState()
  // reducer for total push ups,pull ups and squats //////////////////
  const totalReducer = (state, action) => {}

  const [state, dispatch] = useReducer(totalReducer, {
    pushup: totalPushups,
    pullups: totalPullUps,
    squats: totalSquats,
  })

  useEffect(() => {
    const firstSteps = () => {
      if (totalPushups > 0 || totalPullUps > 0 || totalSquats > 0) {
        setFirstStepsAward(1)
      }
    }
    const commited = () => {
      if (totalPushups > 0) {
        setCommitedAward((commitedAwardCounter = commitedAwardCounter + 1))
      }

      if (totalPullUps > 0) {
        setCommitedAward((commitedAwardCounter = commitedAwardCounter + 1))
      }

      if (totalSquats > 0) {
        setCommitedAward((commitedAwardCounter = commitedAwardCounter + 1))
      }
    }

    firstSteps()
    commited()
  }, [pushupUid, pullupUid, squatUid])

  return (
    <AchievementContext.Provider
      value={{
        pushupUid,
        pullupUid,
        squatUid,
        totalPullUps,
        totalPushups,
        totalSquats,

        firstStepsAward,
        commitedAward,
      }}
    >
      {children}
    </AchievementContext.Provider>
  )
}

export const AchievementUseContext = () => {
  return useContext(AchievementContext)
}
