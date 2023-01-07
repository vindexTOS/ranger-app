import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { motion as m } from 'framer-motion'
function PrevSets(props) {
  const { pushupUid, timestamp, convertDate } = MainUseContext()

  const style = {
    prevPush: ` max_md:w-[4rem]  z-10  border-l-2 rounded-l-[50%] rounded-r-[40%]  border-b-2 rounded-[8px] h-[5rem] w-[6rem] flex items-center justify-center`,
    mainDiv: `flex gap-2 max_md:items-center max_md:justify-center   `,
    sets: `text-[3rem] text-black`,
    header: `z-10    font-bold flex flex-col itmes-center text-center justify-center border-t-2 rounded-t-[40px] w-[30rem] max_md:w-[24rem] max_md:ml-[1.2rem] `,
    prevDiv: `w-[100%] h-[9rem]  rounded-[12px]  purp-bg flex flex-col gap-2 items-center justify-center   `,
  }

  return (
    <div className={style.prevDiv}>
      {' '}
      <m.h1
        className={style.header}
        initial={{ y: -400 }}
        animate={{ y: 0, transition: { duration: 2 } }}
      >
        Previous Workout Date
        <span className="border-b-2 rounded-b-[50%] ]"> {timestamp}</span>
      </m.h1>
      <div className={style.mainDiv}>
        <m.div
          initial={{ y: -400 }}
          animate={{ y: 0, transition: { duration: 1 } }}
          className={style.prevPush}
        >
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setOne}
                </p>
              )
            }
          })}
        </m.div>
        <m.div
          className={style.prevPush}
          initial={{ y: -450 }}
          animate={{ y: 0, transition: { duration: 1.2 } }}
        >
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setTwo}
                </p>
              )
            }
          })}
        </m.div>
        <m.div
          className={style.prevPush}
          initial={{ y: -400 }}
          animate={{ y: 0, transition: { duration: 1.4 } }}
        >
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setTree}
                </p>
              )
            }
          })}
        </m.div>{' '}
        <m.div
          className={style.prevPush}
          initial={{ y: -400 }}
          animate={{ y: 0, transition: { duration: 1.6 } }}
        >
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setFore}
                </p>
              )
            }
          })}
        </m.div>{' '}
        <m.div
          className={style.prevPush}
          initial={{ y: -400 }}
          animate={{ y: 0, transition: { duration: 1.8 } }}
        >
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setFive}
                </p>
              )
            }
          })}
        </m.div>
      </div>
    </div>
  )
}

export default PrevSets
