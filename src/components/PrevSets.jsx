import React from 'react'
import { MainUseContext } from '../context/MainContext'
function PrevSets(props) {
  const { pushupUid, timestamp, convertDate } = MainUseContext()

  const style = {
    prevPush: `bg-[#54bff5] rounded-[12px] h-[5rem] w-[6rem] flex items-center justify-center`,
    mainDiv: `flex gap-2`,
    sets: `text-[3rem] text-white`,
    prevDiv: `w-[50%] h-[10rem] btnshaddow rounded-[12px] bg-white flex flex-col gap-2 items-center justify-center `,
  }

  return (
    <div className={style.prevDiv}>
      {' '}
      <h1>previous day's workout {convertDate(timestamp)}</h1>
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
