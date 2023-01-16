import React from 'react'
import { MainUseContext } from '../../../context/MainContext'
import { motion as m } from 'framer-motion'
import { prevStyle as style } from './styles'
function PrevSets() {
  const { pushupUid, timestamp, convertDate } = MainUseContext()
  /// function for prev single div
  const prevSetDiv = (set) => {
    return (
      <m.div
        initial={{ y: -200 }}
        animate={{ y: 0, transition: { duration: 1 } }}
        className={style.prevPush}
      >
        {pushupUid.map((item, index) => {
          if (pushupUid.length - 1 <= index) {
            return (
              <p className={style.sets} key={item.id}>
                {item.sets[0][set]}
              </p>
            )
          }
        })}
      </m.div>
    )
  }
  /////////////////////////////////
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 3 } }}
      className={style.prevDiv}
    >
      {' '}
      <m.h1
        className={style.header}
        initial={{ y: -20 }}
        animate={{ y: 0, transition: { duration: 2 } }}
      >
        Previous Workout Date
        {timestamp ? (
          <span className="border-b-2 rounded-b-[50%] ]"> {timestamp}</span>
        ) : (
          <span className="border-b-2 rounded-b-[50%] flex items-center justify-center">
            Loading Date...
          </span>
        )}
      </m.h1>
      <div className={style.mainDiv}>
        {prevSetDiv('setOne')}
        {prevSetDiv('setTwo')}
        {prevSetDiv('setThree')}
        {prevSetDiv('setFour')}
        {prevSetDiv('setFive')}
      </div>
    </m.div>
  )
}

export default PrevSets
