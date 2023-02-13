import React from 'react'
import { NavUseContext } from '../../context/NavBarContext'
import { AwardIcons } from '../pages/Achivments.page/AwardUtils'
function Award() {
  const {
    firstStepsAward,
    commitedAward,
    pushupUid,
    pullupUid,
    squatUid,
    totalPullUps,
    totalPushups,
    totalSquats,
    dark,
    //award states
  } = NavUseContext()
  const style = {
    mainDiv: `w-[19rem] h-[100px] flex gap-1 ${
      dark && ' border-t-2 '
    }  award-setting-grid-wrapper p-2`,
    img: `w-[40px] h-[40px] bg-red-400 rounded-[12px]`,
  }
  let totalSession = pushupUid.length + pullupUid.length + squatUid.length
  let totalRepsOfAll = totalSquats + totalPullUps + totalPushups
  const awardImg = (Award, lockAward, num, bool, color) => {
    return (
      <img
        className={`w-[40px] h-[40px] ${color} rounded-[12px]`}
        src={bool >= num ? AwardIcons[Award] : AwardIcons[lockAward]}
      />
    )
  }
  return (
    <div className={style.mainDiv}>
      {awardImg(
        'firstSteps',
        'firstStepsBefore',
        1,
        firstStepsAward,
        'bg-green-300',
      )}
      {awardImg('commited', 'commitedLock', 3, commitedAward, 'bg-red-400')}
      {awardImg('gravity', 'gravityLock', 150, totalPushups, 'bg-blue-400')}
      {awardImg(
        'hangInThere',
        'hangInThereLock',
        100,
        totalPullUps,
        'bg-orange-400',
      )}
      {awardImg('atlas', 'atlasLock', 200, totalSquats, 'bg-blue-400')}
      {awardImg(
        'spartan',
        'spartanLock',
        1000,
        totalRepsOfAll,
        'bg-purple-500',
      )}
      {awardImg('dicip', 'dicipLock', 30, totalSession, 'bg-blue-300')}
      {awardImg(
        'pushUpMuscleLvl3',
        'pushUpMuscleLock',
        1000,
        totalPushups,
        'bg-green-400',
      )}
      {awardImg(
        'Monkking',
        'MonkKingLock',
        1000,
        totalPullUps,
        'bg-orange-300',
      )}
      {awardImg('Milobull', 'MilobullLock', 1000, totalSquats, 'bg-red-300')}
    </div>
  )
}

export default Award
