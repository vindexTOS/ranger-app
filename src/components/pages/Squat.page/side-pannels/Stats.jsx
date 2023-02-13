import React from 'react'
import { SquatUseContext } from '../../../../context/SquatContext'
import { MainUseContext } from '../../../../context/MainContext'
import { ImStatsDots } from 'react-icons/im'
import { motion as m } from 'framer-motion'

function Stats() {
  const {
    totalSquats,
    squatUid,
    workoutmax,
    testedMaxSquat,
  } = SquatUseContext()
  const { dark } = MainUseContext()
  const style = {
    mainDiv: `w-[350px]      h-[10rem]  max_xl:ml-10 gap-2 flex flex-col items-center border-r-2   border-blue-400   `,
    subDiv: `flex flex-row gap-5 items-center `,
    header: `  w-[40%] gap-10 h-[2rem] flex items-center justify-start text-center mt-[5px] border-blue-400   border-t-2`,
    statHeader: `border-blue-400  border-b-2 flex items-center justify-start text-gray-500 font-bold    overflow-hidden text-[12px] h-[1.2rem] w-[180px]  ${
      dark ? 'text-color' : 'text-blue-300'
    } `,
    pstat: `w-[4rem] h-[1.2rem]   border-b-2    text-center flex items-center justify-center  ${
      dark ? 'text-color' : 'text-blue-300'
    }`,
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
        <h1 className={style.statHeader}>Total Squats</h1>{' '}
        <p className={style.pstat}>{totalSquats}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Tested Max</h1>
        <p className={style.pstat}>{testedMaxSquat}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Personal Record</h1>
        <p className={style.pstat}>{workoutmax}</p>
      </div>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Total Recorded Workouts</h1>
        <p className={style.pstat}>{squatUid.length}</p>
      </div>
    </div>
  )
}

export default Stats
