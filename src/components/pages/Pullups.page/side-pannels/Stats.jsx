import React from 'react'
import { PullUpUseContext } from '../../../../context/PullUpContext'
import { ImStatsDots } from 'react-icons/im'
import { motion as m } from 'framer-motion'

function Stats() {
  const {
    pullupUid,
    maxPullUpUid,
    totalPullUps,
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
  const style = {
    mainDiv: `w-[350px]      h-[10rem]  max_xl:ml-10 gap-2 flex flex-col items-center border-r-2 border-orange-400    `,
    subDiv: `flex flex-row gap-5 items-center `,
    header: `  w-[40%] gap-10 h-[2rem] flex items-center justify-start text-center mt-[5px] border-orange-400 text-orange-400   border-t-2`,
    statHeader: ` border-orange-400 border-b-2 flex items-center justify-start text-gray-500 font-bold    overflow-hidden text-[12px] h-[1.2rem] w-[180px]  `,
    pstat: `w-[4rem] h-[1.2rem]   border-b-2  text-color   text-center flex items-center justify-center`,
  }

  return (
    <div
      initial={{ x: 400 }}
      animate={{ x: 0, transition: { duration: 1 } }}
      className={style.mainDiv}
    >
      <h1 className={style.header}>
        Statistics
        <ImStatsDots />
      </h1>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Total Pull Ups</h1>{' '}
        <p className={style.pstat}>{totalPullUps}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Tested Max</h1>
        <p className={style.pstat}>{testedMax}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Personal Record</h1>
        <p className={style.pstat}>{workoutmax}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Total Recorded Workouts</h1>
        <p className={style.pstat}>{pullupUid.length}</p>
      </div>
    </div>
  )
}

export default Stats
