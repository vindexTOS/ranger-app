import React, { PureComponent, useEffect, useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
import PushupGraph from '../Statistic Graphs/PushupGraph'
function StatsPage() {
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
    mainDiv: ` scroll flex flex-row items-center justify-center mb-[8.2rem] max_md:ml-10 rounded-[10px] w-[100vw] h-[90vh] border-t-2 overflow-y-scroll`,
    conteinerDiv: `stats-wrapper   gap-5 items-center justify-center w-[90%] h-[90%]`,
    pushupStat: `w-[100%] h-[300px] bg-white btnshaddow rounded-[12px] flex flex-col items-center justify-center`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.conteinerDiv}>
        <PushupGraph pushupStatData={pushupStatData} />
        <div className={style.pushupStat}></div>
        <div className={style.pushupStat}></div>
        <div className={style.pushupStat}></div>
      </div>
    </div>
  )
}

export default StatsPage
