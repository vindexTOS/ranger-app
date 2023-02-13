import React from 'react'
import { MainUseContext } from '../../../context/MainContext'
import { motion as m } from 'framer-motion'
function History() {
  const { pushupUid, convertDate, dark } = MainUseContext()

  const style = {
    mainDiv: `   w-[90%]    text  h-[280px] border-t-2 border-green-400  orange ${
      dark ? 'text-color ' : 'text-green-300'
    } pb-4  max_xl:ml-10`,
    outsideMapdiv: `overflow-y-scroll scroll h-[200px] border-green-400  w-[100%] border-l-2 border-r-2  pb-2`,

    mapDiv: `flex flex-row gap-[12rem] max_sm:gap-5 mt-2  ml-[5px]`,

    timeDiv: `  flex    items-center border-green-400  border-b-2 justify-center   font-bold  overflow-hidden text-[12px] h-[2rem] w-[50%]  ${
      dark ? 'text-color ' : 'text-green-300'
    }`,
    setDiv: `flex gap-2 flex-row `,
    setHeader: `  w-[1.7rem] text-center   border-green-400 border-b-2   ${
      dark ? 'text-color ' : 'text-green-300'
    } `,
    headerDiv: `w-[100%] flex items-center justify-center `,
    header: ` w-[60%] h-[2rem] flex items-center justify-center text-center text-green-400  mt-[5px] font-bold   rounded-[15px]`,
    titlesDiv: `w-[100%] gap-20 max_sm:gap-0 flex justify-between mt-5 mb-5 `,
    titleHeader: `w-[100%] max_sm:w-[3rem] max_sm:text-[1rem] text-[2rem] text-center flex items-center justify-center text-green-400  border-green-400    `,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.headerDiv}>
        {' '}
        <h1 className={style.header}>Push Up Workout History</h1>
      </div>
      <div className={style.titlesDiv}>
        <h1 className={`${style.titleHeader}  `}>Date</h1>
        <h1 className={`${style.titleHeader} ml-10 `}>Sets</h1>
      </div>
      <div className={style.outsideMapdiv}>
        {pushupUid.map((val, index) => {
          let newDate = ''
          if (pushupUid) {
            newDate = val.time
            return (
              <div key={index} className={style.mapDiv}>
                <div className={style.timeDiv}>
                  <h1> {newDate}</h1>
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
