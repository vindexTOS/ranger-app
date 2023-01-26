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
    mainDiv: `w-[100vw] relative  h-[700px]   rounded-[8px] border-2 flex flex-col mt-10 items-center justify-center max_sm:ml-2 `,
  }
  let totalSession = pushupUid.length + pullupUid.length + squatUid.length
  let totalRepsOfAll = totalSquats + totalPullUps + totalPushups
  return (
    <div className={style.mainDiv}>
      <h1 className="text-[2rem] border-b-2 w-[100%] text-center">
        Achievements
      </h1>
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
        {/*push up mile stones */}
        <SingleAchievement
          props={{
            data: totalPushups,
            maxCompleted: 1000,

            img:
              totalPushups >= 1000
                ? AwardIcons.pushUpMuscleLvl3
                : AwardIcons.pushUpMuscleLock,
            goal: 'Do 1000 Push Ups',
            name: 'Start Counting When It Hurts',
            label: `${totalPushups >= 1000 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*pull up mile stones */}
        <SingleAchievement
          props={{
            data: totalPullUps,
            maxCompleted: 1000,

            img:
              totalPullUps >= 1000
                ? AwardIcons.Monkking
                : AwardIcons.MonkKingLock,
            goal: 'Do 1000 Pull Ups',
            name: 'Pull Your Self Up',
            label: `${totalPullUps >= 1000 ? 'Completed' : '...In Progress'}`,
          }}
        />
        {/*squat mile stones */}
        <SingleAchievement
          props={{
            data: totalSquats,
            maxCompleted: 1000,

            img:
              totalSquats >= 10000
                ? AwardIcons.Milobull
                : AwardIcons.MilobullLock,
            goal: 'Do 1000 Squats',
            name: 'Squat Until You Walk',
            label: `${totalSquats >= 1000 ? 'Completed' : '...In Progress'}`,
          }}
        />
      </div>
    </div>
  )
}

export default Achivmens
