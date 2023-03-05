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

    workoutmax,
    testedMaxPullUp,
  } = PullUpUseContext()

  // this state takes date and time where total collected push ups was done
  const [pullupStatData, setpullupStatData] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      // this gives us time Date from API
      let totalpullup = pullupStats.map((val) => {
        return { 'Total Pull Ups': val }
      })

      setpullupStatData(totalpullup)
    }, 500)
  }, [pullupStats])
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
          totalPullUps == null || totalPullUps == 0 ? '...' : totalPullUps,
          'Total Pull Ups',
        )}
        {subStatsDiv(
          dumbbell,
          testedMaxPullUp == null || testedMaxPullUp == 0
            ? '...'
            : testedMaxPullUp,
          'Tested Max',
        )}
        {subStatsDiv(
          prFitness,
          workoutmax == null || workoutmax == 0 ? '...' : workoutmax,
          'Training PR',
        )}
        {subStatsDiv(
          schedule,
          pullupUid == null || pullupUid == 0 ? '...' : pullupUid.length,
          'Days Trained',
        )}
      </div>
    </div>
  )
}

export default PullupGraphMain
