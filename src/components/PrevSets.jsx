import React from 'react'
import { MainUseContext } from '../context/MainContext'
function PrevSets(props) {
  const { pushupUid, timestamp, convertDate } = MainUseContext()

  const style = {
    prevPush: ` border-l-2 rounded-l-[50%] rounded-r-[40%]  border-b-2 rounded-[8px] h-[5rem] w-[6rem] flex items-center justify-center`,
    mainDiv: `flex gap-2`,
    sets: `text-[3rem] text-black`,
    prevDiv: `w-[100%] h-[9rem]  rounded-[12px]  purp-bg flex flex-col gap-2 items-center justify-center  max_lg:w-[80%] max_md:w-[70%]`,
  }

  return (
    <div className={style.prevDiv}>
      {' '}
      <h1>previous day's workout {timestamp}</h1>
      <div className={style.mainDiv}>
        <div className={style.prevPush}>
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setOne}
                </p>
              )
            }
          })}
        </div>
        <div className={style.prevPush}>
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setTwo}
                </p>
              )
            }
          })}
        </div>
        <div className={style.prevPush}>
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setTree}
                </p>
              )
            }
          })}
        </div>{' '}
        <div className={style.prevPush}>
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setFore}
                </p>
              )
            }
          })}
        </div>{' '}
        <div className={style.prevPush}>
          {pushupUid.map((item, index) => {
            if (pushupUid.length - 1 <= index) {
              return (
                <p className={style.sets} key={item.id}>
                  {item.sets[0].setFive}
                </p>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default PrevSets
