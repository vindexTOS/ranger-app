import React, { PureComponent, useEffect, useState } from 'react'
import { MainUseContext } from '../../../context/MainContext'
import PushupGraph from './PushupGraph'
function PushUpStatMain() {
  const { pushupStats, pushupUid, BMIconvertor } = MainUseContext()
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
    conteinerDiv: `stats-wrapper w-[100%] h-[100%]  `,
    pushupStat: `w-[800px] h-[500px] bg-white  border-2 rounded-[12px] flex flex-col items-center justify-center max_md:h-[300px] max_md:w-[370px]`,
  }

  return (
    <div className={style.conteinerDiv}>
      <div className={style.pushupStat}>
        <PushupGraph pushupStatData={pushupStatData} />
        <button onClick={() => console.log(BMIconvertor())}>
          ::::::BU::::::
        </button>
      </div>
    </div>
  )
}

export default PushUpStatMain
