import React from 'react'
import { MainUseContext } from '../../../../context/MainContext'
import { motion as m } from 'framer-motion'
function History() {
  const { pushupUid, convertDate } = MainUseContext()

  const style = {
    mainDiv: `   w-[350px]   text  h-[310px]   border-t-2 border-r-2    pb-4 rounded-b-0 rounded-t-[14px] max_xl:ml-10`,

    mapDiv: `flex flex-row gap-5 mt-2  ml-[5px]`,

    outsideMapdiv: `overflow-y-scroll scroll h-[200px] rounded-[12px]  pb-2`,
    timeDiv: ` flex items-center   border-b-2 justify-center text-color font-bold  overflow-hidden text-[12px] h-[1.6rem] w-[40%]`,
    setDiv: `flex gap-2 flex-row `,
    setHeader: `  w-[1.7rem] text-center    border-b-2 text-color  `,
    headerDiv: `w-[100%] flex items-center justify-center `,
    header: ` w-[60%] h-[2rem] flex items-center justify-center text-center   mt-[5px] font-bold text-color rounded-[15px]`,
    titlesDiv: `w-[100%] flex justify-between mt-5 mb-5 `,
    titleHeader: `w-[3rem] text-center     text-color    border-b-2 `,
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
                  <h1 className={style.setHeader}>{val.sets[0].setThree}</h1>
                  <h1 className={style.setHeader}>{val.sets[0].setFour}</h1>
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
