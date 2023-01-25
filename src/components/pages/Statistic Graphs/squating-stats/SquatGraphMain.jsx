import React, { PureComponent, useEffect, useState } from 'react'
import subStatsDiv from './subStatsDiv'
import { SquatUseContext } from '../../../../context/SquatContext'
import SquatGraph from './squatGraph'
import schedule from '../../../../utils/png/calendar.png'
import prFitness from '../../../../utils/png/fitness-blogger.png'
import dumbbell from '../../../../utils/png/dumbbell.png'
import squatstatImg from '../../../../utils/png/squatstat.png'
function SquatGraphMain() {
  const {
    squatUid,
    squatStats,
    totalSquats,
    maxSquatUid,

    workoutmax,
  } = SquatUseContext()
  let testedMax = maxSquatUid

    .filter((val, index) => {
      if (maxSquatUid.length - 1 <= index) {
        return val
      }
    })
    .map((val) => {
      return val.userInfo[0].User_squat_Max
    })
  // this state takes date and time where total collected push ups was done
  const [squatStatsData, setSquatStatsData] = useState()

  /// use effect calls two above functions
  useEffect(() => {
    setTimeout(() => {
      // this gives us time Date from API
      let totalSquats = squatStats.map((val) => {
        return { 'Total squats': val }
      })

      setSquatStatsData(totalSquats)
    }, 1000)
  }, [squatUid, squatStats])

  const style = {
    conteinerDiv: `flex flex-col justify-center items-center w-[100%] h-[100%]  gap-10 `,
    squatStat: `w-[90%] h-[100%] bg-[#f0f0f0] flex flex-col items-center justify-center border-blue-400  border-2 rounded-[12px]   max_sm:pd-10  max_sm:mt-0  max_sm:mb-10  max_sm:w-[100%] max_sm:ml-10   max_md:h-[300px] max_md:w-[370px]`,
    smallStatsDiv: `w-[90%] flex items-center   justify-center flex-row gap-5 max_sm:gap-1 max_sm:ml-10  `,
  }

  return (
    <div className={style.conteinerDiv}>
      <div className={style.squatStat}>
        <SquatGraph squatStatsData={squatStatsData} />
      </div>
      <div className={style.smallStatsDiv}>
        {subStatsDiv(
          squatstatImg,
          totalSquats == null || totalSquats == 0 ? '...' : totalSquats,
          'Total Squats',
        )}
        {subStatsDiv(
          dumbbell,
          testedMax == null || testedMax == 0 ? '...' : testedMax,
          'Tested Max',
        )}
        {subStatsDiv(
          prFitness,
          workoutmax == null || workoutmax == 0 ? '...' : workoutmax,
          'Training PR',
        )}
        {subStatsDiv(
          schedule,
          squatUid == null || squatUid == 0 ? '...' : squatUid.length,
          'Days Trained',
        )}
      </div>
    </div>
  )
}

export default SquatGraphMain
