import React, { PureComponent, useEffect, useState } from 'react'
import subStatsDiv from './subStatsDiv'
import { MainUseContext } from '../../../../context/MainContext'
import PushupGraph from './PushupGraph'
import schedule from '../../../../utils/png/calendar.png'
import prFitness from '../../../../utils/png/fitness-blogger.png'
import dumbbell from '../../../../utils/png/dumbbell.png'
import pushuptotal from '../../../../utils/png/pushupcheck.png'
function PushUpStatMain() {
  const {
    pushupStats,
    pushupUid,
    totalPushups,
    testedMax,
    workoutmax,
  } = MainUseContext()

  // this state takes date and time where total collected push ups was done
  const [pushupStatData, setPushupStatData] = useState()

  /// use effect calls two above functions
  useEffect(() => {
    setTimeout(() => {
      // this gives us time Date from API
      let totalPushUps = pushupStats.map((val) => {
        return { 'Total Push Ups': val }
      })

      setPushupStatData(totalPushUps)
    }, 1000)
  }, [pushupUid, pushupStats])

  const style = {
    conteinerDiv: `flex flex-col justify-center items-center w-[100%] h-[100%]  gap-10 `,
    pushupStat: `w-[90%] h-[100%] bg-[#f0f0f0] flex flex-col items-center justify-center   border-2 rounded-[12px]   max_sm:pd-10  max_sm:mt-0  max_sm:mb-10  max_sm:w-[100%] max_sm:ml-10   max_md:h-[300px] max_md:w-[370px]`,
    smallStatsDiv: `w-[90%] flex items-center   justify-center flex-row gap-5 max_sm:gap-1 max_sm:ml-10 `,
  }

  return (
    <div className={style.conteinerDiv}>
      <div className={style.pushupStat}>
        <PushupGraph pushupStatData={pushupStatData} />
      </div>
      <div className={style.smallStatsDiv}>
        {subStatsDiv(
          pushuptotal,
          totalPushups == null || totalPushups == 0
            ? 'Loading...'
            : totalPushups,
          'Total Push Ups',
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
          pushupUid == null || pushupUid == 0 ? 'Loading...' : pushupUid.length,
          'Days Trained',
        )}
      </div>
    </div>
  )
}

export default PushUpStatMain
