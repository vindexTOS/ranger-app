import React, { PureComponent, useEffect, useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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
    mainDiv: `flex flex-row items-center justify-center   w-[100vw] h-[100vh] `,
    conteinerDiv: `stats-wrapper   gap-5 items-center justify-center w-[90%] h-[90%]`,
    pushupStat: `w-[100%] h-[300px] bg-blue-600 btnshaddow rounded-[12px]`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.conteinerDiv}>
        <div className={style.pushupStat}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={pushupStatData}>
              <Line
                type="monotone"
                dataKey="stats"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={style.pushupStat}></div>
        <div className={style.pushupStat}></div>
        <div className={style.pushupStat}></div>
      </div>
    </div>
  )
}

export default StatsPage
