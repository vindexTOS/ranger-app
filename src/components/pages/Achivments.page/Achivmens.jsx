import React from 'react'
import SingleAchievement from './SingleAchievement'
import { AwardIcons } from './AwardUtils'
import { AchievementUseContext } from '../../../context/AchievementContext'
function Achivmens(props) {
  const {
    firstStepsAward,
    commitedAward,
    pushupUid,
    pullupUid,
    squatUid,
    totalPullUps,

    totalPushups,
    totalSquats,
  } = AchievementUseContext()
  const style = {
    mainDiv: `w-[100vw] relative  h-[700px] border-4 border-black flex flex-col  items-center justify-center`,
  }
  let totalSession = pushupUid.length + pullupUid.length + squatUid.length
  let totalRepsOfAll = totalSquats + totalPullUps + totalPushups
  return (
    <div className={style.mainDiv}>
      <div className="flex flex-col items-center  w-[100%] p-5  overflow-y-scroll scroll   gap-5   ">
        {/*When user completes each given exeresises  */}
        <SingleAchievement
          props={{
            data: firstStepsAward,
            maxCompleted: 1,
            img:
              firstStepsAward > 0
                ? AwardIcons.firstSteps
                : AwardIcons.firstStepsBefore,
            goal: 'Complete One WorkOut',
            name: 'First Steps',
            label: `${firstStepsAward > 0 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*When user does all 3 trainings  */}
        <SingleAchievement
          props={{
            data: commitedAward,
            maxCompleted: 3,
            img:
              commitedAward >= 3
                ? AwardIcons.commited
                : AwardIcons.commitedLock,
            goal: 'Complete All 3 Exercises',
            name: 'Commited!',
            label: `${commitedAward >= 3 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*On The Road Award when user achives 100 reps for each given excerseis  */}
        {/*Push ups   */}
        <SingleAchievement
          props={{
            data: totalPushups,
            maxCompleted: 150,
            img:
              totalPushups >= 150 ? AwardIcons.gravity : AwardIcons.gravityLock,
            goal: 'Do 150 Total Push Ups',
            name: 'Push The Eath Down',
            label: `${totalPushups >= 150 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*Pull ups   */}
        <SingleAchievement
          props={{
            data: totalPullUps,
            maxCompleted: 100,
            img:
              totalPullUps >= 100
                ? AwardIcons.hangInThere
                : AwardIcons.hangInThereLock,
            goal: 'Do 100 Total Pull Ups',
            name: 'Hang In There...',
            label: `${totalPullUps >= 100 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*Squat   */}
        <SingleAchievement
          props={{
            data: totalSquats,
            maxCompleted: 200,
            img: totalSquats >= 200 ? AwardIcons.atlas : AwardIcons.atlasLock,
            goal: 'Do 200 Total Squats',
            name: 'ATLAS RISE!!',
            label: `${totalSquats >= 200 ? 'Completed' : '...In Progress'}`,
          }}
        />{' '}
        {/*300 reps for every single exercise spartan award   */}
        <SingleAchievement
          props={{
            data: totalRepsOfAll,
            maxCompleted: 1000,
            img:
              totalRepsOfAll >= 1000
                ? AwardIcons.spartan
                : AwardIcons.spartanLock,
            goal: 'Do 300 Rep For Each Exercises',
            name: '300 Club',
            label: `${totalRepsOfAll >= 1000 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*total workout sessions more than 30 workouts  */}
        <SingleAchievement
          props={{
            data: totalSession,
            maxCompleted: 30,
            img: totalSession >= 30 ? AwardIcons.dicip : AwardIcons.dicipLock,
            goal: 'Complete 30 WorkOut Sessions ',
            name: 'Suffer The Pain Of Discipline  ',
            label: `${totalSession >= 30 ? 'Completed' : '...In Progress'}`,
          }}
        />
        <button onClick={() => console.log(totalSession)}>":::::</button>
      </div>
    </div>
  )
}

export default Achivmens
