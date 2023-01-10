import React from 'react'
import StatNav from '../Statistic Graphs/StatNav'
import PushUpMain from '../Statistic Graphs/pushup-stats/PushUpGrapgMain'
import { Outlet } from 'react-router-dom'

function StatsPage() {
  const style = {
    mainSection: `w-[100%] h-[100%]     flex flex-row  gap-5  mr-[6rem]   items-center  max_md:mt-[4rem]`,
    mainDiv: ` scroll border-t-2 rounded-[8px] bg-red-600  flex pb-10 items-center justify-center w-[90%] h-[700px] gap-5  mb-10    overflow-y-scroll`,
  }
  return (
    <section className={style.mainSection}>
      <div className={style.mainDiv}>
        <Outlet />
      </div>
      <StatNav />
    </section>
  )
}

export default StatsPage
