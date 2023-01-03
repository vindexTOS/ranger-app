import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { ImStatsDots } from 'react-icons/im'

function Stats() {
  const { pushupUid, pushupStats, pushupData, maxUid } = MainUseContext()

  const [totalPushups, setTotalpushups] = React.useState(null)

  let workoutmax = 0
  pushupUid.map((val) => {
    let setOne = Number(val.sets[0].setOne)
    let setTwo = Number(val.sets[0].setTwo)
    let setThree = Number(val.sets[0].setTree)
    let setFore = Number(val.sets[0].setFore)
    let setFive = Number(val.sets[0].setFive)

    if (workoutmax < setOne) {
      workoutmax = setOne
    }
    if (workoutmax < setTwo) {
      workoutmax = setTwo
    }
    if (workoutmax < setThree) {
      workoutmax = setThree
    }
    if (workoutmax < setFore) {
      workoutmax = setFore
    }
    if (workoutmax < setFive) {
      workoutmax = setFive
    }
  })
  const [testedMax, settestedMax] = React.useState(null)
  setTimeout(() => {
    if (maxUid[0].userMax !== undefined) {
      settestedMax(maxUid[0].userMax.join(''))
    }
  }, 10000)

  React.useEffect(() => {
    setTimeout(() => {
      let pushupStatReducer = pushupStats.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )
      setTotalpushups(pushupStatReducer)
    }, 2000)
  }, [pushupStats])

  const style = {
    mainDiv: `w-[400px] h-[10rem] gap-2 flex flex-col items-center bg-white ml-[2rem] mb-[] btnshaddow rounded-[12px]`,
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
