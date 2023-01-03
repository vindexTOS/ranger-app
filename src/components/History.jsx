import React from 'react'
import { MainUseContext } from '../context/MainContext'
function History() {
  const { pushupUid, convertDate } = MainUseContext()

  const style = {
    mainDiv: ` btnshaddow w-[350px] h-[300px]  bg-white     rounded-[12px] pb-5`,

    mapDiv: `flex flex-row gap-5 mt-2  ml-[5px]`,
    outsideMapdiv: `overflow-y-scroll scroll h-[200px]  pb-2`,
    timeDiv: `btnshaddow flex items-center justify-center text-blue-500 font-bold bg-[#ffd31d] overflow-hidden text-[12px] h-[1.6rem] w-[40%] rounded-[8px]`,
    setDiv: `flex gap-2 flex-row `,
    setHeader: `bg-blue-300 w-[1.7rem] text-center rounded-[50%] text-white btnshaddow`,
    headerDiv: `w-[100%] flex items-center justify-center `,
    header: `btnshaddow w-[60%] h-[2rem] flex items-center justify-center text-center bg-[#ffa700] mt-[5px] font-bold text-white rounded-[15px]`,
    titlesDiv: `w-[100%] flex justify-between mt-5 mb-5 `,
    titleHeader: `w-[3rem] text-center bg-[#ffa700] text-white btnshaddow rounded-[8px]  `,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.headerDiv}>
        {' '}
        <h1 className={style.header}>Push Up Workout History</h1>
      </div>
      <div className={style.titlesDiv}>
        <h1 className={`${style.titleHeader} ml-[0.5rem] `}>Date</h1>
        <h1 className={`${style.titleHeader} mr-[9rem]`}>Sets</h1>
      </div>
      <div className={style.outsideMapdiv}>
        {pushupUid.map((val, index) => {
          let newDate = ''
          if (pushupUid) {
            newDate = val.time
            return (
              <div key={index} className={style.mapDiv}>
                <div className={style.timeDiv}>
                  <h1> {newDate.slice(4, 16)}</h1>
                </div>
                <div className={style.setDiv}>
                  <h1 className={style.setHeader}>{val.sets[0].setOne}</h1>
                  <h1 className={style.setHeader}>{val.sets[0].setTwo}</h1>
                  <h1 className={style.setHeader}>{val.sets[0].setTree}</h1>
                  <h1 className={style.setHeader}>{val.sets[0].setFore}</h1>
                  <h1 className={style.setHeader}>{val.sets[0].setFive}</h1>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default History
