import React, { PureComponent, useEffect, useState } from 'react'
import subStatsDiv from './subStatsDiv'
import { PullUpUseContext } from '../../../../context/PullUpContext'
import PullupGraph from './pullupGraph'
import schedule from '../../../../utils/png/calendar.png'
import prFitness from '../../../../utils/png/fitness-blogger.png'
import dumbbell from '../../../../utils/png/dumbbell.png'
import pullupstatsImg from '../../../../utils/png/pullupstats.png'
function PullupGraphMain() {
  const {
    pullupUid,
    pullupStats,
    totalPullUps,
    maxPullUpUid,

    workoutmax,
  } = PullUpUseContext()
  let testedMax = maxPullUpUid

    .filter((val, index) => {
      if (maxPullUpUid.length - 1 <= index) {
        return val
      }
    })
    .map((val) => {
      return val.userInfo[0].User_pullUp_Max
    })
  // this state takes date and time where total collected push ups was done
  const [pullupStatData, setpullUpStatData] = useState()

  /// use effect calls two above functions
  useEffect(() => {
    setTimeout(() => {
      // this gives us time Date from API
      let totalPullups = pullupStats.map((val) => {
        return { 'Total Pull Ups': val }
      })

      setpullUpStatData(totalPullups)
    }, 1000)
  }, [pullupUid, pullupStats])

  const style = {
    conteinerDiv: `flex flex-col justify-center items-center w-[100%] h-[100%]  gap-10 `,
    pullupStat: `w-[90%] h-[100%] bg-[#f0f0f0] flex flex-col items-center justify-center border-orange-400  border-2 rounded-[12px]   max_sm:pd-10  max_sm:mt-0  max_sm:mb-10  max_sm:w-[100%] max_sm:ml-10   max_md:h-[300px] max_md:w-[370px]`,
    smallStatsDiv: `w-[90%] flex items-center   justify-center flex-row gap-5 max_sm:gap-1 max_sm:ml-10 border-orange-400 `,
  }

  return (
    <div className={style.conteinerDiv}>
      <div className={style.pullupStat}>
        <PullupGraph pullupStatData={pullupStatData} />
      </div>
      <div className={style.smallStatsDiv}>
        {subStatsDiv(
          pullupstatsImg,
          totalPullUps == null || totalPullUps == 0
            ? 'Loading...'
            : totalPullUps,
          'Total Pull Ups',
        )}
        {subStatsDiv(
          dumbbell,
          testedMax == null || testedMax == 0 ? 'Loading...' : testedMax,
          'Tested Max',
        )}
        {subStatsDiv(
          prFitness,
          workoutmax == null || workoutmax == 0 ? 'Loading...' : workoutmax,
          'Training PR',
        )}
        {subStatsDiv(
          schedule,
          pullupUid == null || pullupUid == 0 ? 'Loading...' : pullupUid.length,
          'Days Trained',
        )}
      </div>
    </div>
  )
}

export default PullupGraphMain
