import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { ImStatsDots } from 'react-icons/im'

function Stats() {
  const { pushupUid, totalPushups, testedMax, workoutmax } = MainUseContext()

  const style = {
    mainDiv: `w-[350px]  max_xl:w-[93%] h-[10rem]  gap-2 flex flex-col items-center bg-white ml-[2rem]    btnshaddow rounded-[12px]`,
    subDiv: `flex flex-row gap-5 items-center `,
    header: `btnshaddow w-[40%] gap-3 h-[2rem] flex items-center justify-center text-center bg-[#ffa700] mt-[5px] font-bold text-white rounded-[15px]`,
    statHeader: `btnshaddow flex items-center justify-center text-blue-500 font-bold bg-[#ffd31d] overflow-hidden text-[12px] h-[1.2rem] w-[180px] rounded-[8px]`,
    pstat: `w-[4rem] h-[1.2rem] bg-blue-400 text-white rounded-[12px] text-center flex items-center justify-center`,
  }

  return (
    <div className={style.mainDiv}>
      <h1 className={style.header}>
        Statistics
        <ImStatsDots />
      </h1>
      <div className={style.subDiv}>
        <h1 className={style.statHeader}>Total PushUps</h1>{' '}
        <p className={style.pstat}>{totalPushups}</p>
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
        <p className={style.pstat}>{pushupUid.length}</p>
      </div>
    </div>
  )
}

export default Stats