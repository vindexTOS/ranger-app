import React from 'react'
import { PullUpUseContext } from '../../../../context/PullUpContext'
import { motion as m } from 'framer-motion'
function History() {
  const { pullupUid, maxPullUpUid } = PullUpUseContext()

  const style = {
    mainDiv: ` w-[350px]     h-[310px] border-orange-400  border-t-2 border-r-2  pb-4 rounded-b-0 rounded-t-[14px] max_xl:ml-10`,

    mapDiv: `flex flex-row gap-5 mt-2  ml-[5px]`,

    outsideMapdiv: `overflow-y-scroll scroll h-[200px] rounded-[12px]  pb-2`,
    timeDiv: ` flex  text-color  items-center border-orange-400  border-b-2 justify-center   font-bold  overflow-hidden text-[12px] h-[1.6rem] w-[40%]`,
    setDiv: `flex gap-2 flex-row `,
    setHeader: `  w-[1.7rem] text-center text-color   border-orange-400 border-b-2   `,
    headerDiv: `w-[100%] flex items-center justify-center `,
    header: ` w-[60%] h-[2rem] flex items-center justify-center text-center text-orange-400  mt-[5px] font-bold   rounded-[15px]`,
    titlesDiv: `w-[100%] flex justify-between mt-5 mb-5 `,
    titleHeader: `w-[3rem] text-center  text-orange-400  border-orange-400  border-b-2 `,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.headerDiv}>
        {' '}
        <h1 className={style.header}>Pull Up Workout History</h1>
      </div>
      <div className={style.titlesDiv}>
        <h1 className={`${style.titleHeader} ml-[0.5rem] `}>Date</h1>
        <h1 className={`${style.titleHeader} mr-[9rem]`}>Sets</h1>
      </div>
      <div className={style.outsideMapdiv}>
        {pullupUid.map((val, index) => {
          let newDate = ''
          if (pullupUid) {
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
