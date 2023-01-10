import React, { PureComponent, useEffect, useState } from 'react'
import { MainUseContext } from '../../../context/MainContext'
import PushupGraph from './PushupGraph'
function PushUpStatMain() {
  const {
    pushupUid,
    totalPushups,
    testedMax,
    workoutmax,
    pushupStats,
  } = MainUseContext()

  const [pushupStatData, setPushupStatData] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      let newData = pushupStats.map((val) => {
        return { stats: val }
      })
      setPushupStatData(newData)
    }, 5000)
  }, [pushupStats])

  const style = {
    conteinerDiv: ` flex flex-row bg-red-600 w-[600px]   gap-10   items-center  max_md:mt-[4rem]`,
    pushupStat: `w-[300px]   h-[280px] border-l-2 bg-white btnshaddow rounded-[12px] flex flex-col items-center justify-center`,
    divWrapper: `flex flex-col gap-5   `,
  }

  return (
    <div className={style.conteinerDiv}>
      <div className={style.divWrapper}>
        <div className={style.pushupStat}>
          <PushupGraph pushupStatData={pushupStatData} />{' '}
        </div>
        <div className={style.pushupStat}></div>
      </div>
      <div className={style.divWrapper}>
        {' '}
        <div className={style.pushupStat}></div>
        <div className={style.pushupStat}></div>
      </div>
    </div>
  )
}

export default PushUpStatMain
