import React from 'react'
import { MainUseContext } from '../context/MainContext'
function PrevSets(props) {
  const { pushupUid } = MainUseContext()

  const style = {
    prevPush: `bg-[#e69b3a] h-[5rem] w-[6rem] flex items-center justify-center`,
    mainDiv: `flex gap-2`,
    sets: `text-[3rem]`,
  }

  return (
    <div>
      {' '}
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
