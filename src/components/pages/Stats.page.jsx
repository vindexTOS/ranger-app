import React from 'react'
import StatNav from './Statistic Graphs/Stats.navigation/StatNav'
import { Outlet } from 'react-router-dom'
function StatsPage() {
  const style = {
    mainSection: `w-[100%]  gap-30 h-[750px] flex flex-col items-center  justify-center max_md:mt-[4rem]`,
    mainDiv: `   rounded-[8px]   flex   items-center justify-center w-[100%] h-[700px]  `,
  }
  return (
    <section className={style.mainSection}>
      <StatNav />
      <div className={style.mainDiv}>
        <Outlet />
      </div>
    </section>
  )
}

export default StatsPage
