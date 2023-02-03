import React, { useState, useReducer } from 'react'
import { MainUseContext } from '../../../context/MainContext'
import { SquatUseContext } from '../../../context/SquatContext'
import { PullUpUseContext } from '../../../context/PullUpContext'
import HeaderSkull from '../../../utils/TestMaxPage/headerSkull.png'
import BullSKull from '../../../utils/TestMaxPage/BullSkull.png'
import Gladiator from '../../../utils/TestMaxPage/gladiator.png'
import Dragon from '../../../utils/TestMaxPage/dragon.png'
import { motion as m } from 'framer-motion'
function MaxTestRoom() {
  const {
    maxPushup,
    setSquatMax,
    squatMax,

    setPushUpMax,

    setPullUpMax,
    upDateSquatMax,
    upDateMaxData,
  } = MainUseContext()
  const {} = SquatUseContext()
  const {} = PullUpUseContext()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'squat':
        return { squat: (state.squat = true) }
      case 'pullup':
        return { pullup: (state.pullup = true) }
      case 'pushup':
        return { pushup: (state.push = true) }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    squat: false,
    pushup: false,
    pullup: false,
  })

  const style = {
    mainDiv: `w-[100vw] h-[100vh] border-2 flex m-0 p-0  flex-col items-center justify-center rounded-[8px] border-l-0 `,
    header: `text-[4rem] p-2 mt-2 bg-red-500 rounded-[19px] text-orange-200  flex items-center gap-2 `,
    headerIcon: `w-[50px] h-[50px] `,
    testDivWrapper: `w-[100%] h-[100%] flex flex-wrap gap-2 items-center justify-center   `,
    testDiv: ` bg-red-500 w-[300px] h-[80%] rounded-[19px]  cardshaddow flex flex-col items-center justify-center text-orange-200 text-[1.3rem] gap-2 cursor-pointer`,
    testIcon: `w-[200px] h-[200px]`,
    flipTestDiv: `w-[300px] h-[80%] rounded-[19px] bg-orange-200 cardshaddow flex flex-col items-center justify-center text-orange-200 text-[1.3rem] gap-2 cursor-pointer border-r-2`,
    input: `rounded-[8px] w-[11rem] h-[6rem] text-[5rem] text-center outline-none   `,
  }

  const CardDiv = ({ photo, type, title }) => {
    return (
      <>
        <m.div
          onClick={() => dispatch({ type: `${type}` })}
          className={style.testDiv}
          whileHover={{
            x: [-2, 2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2],
            y: [2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2, -2],
          }}
          transition={{ duration: 5 }}
          exit={{ duration: 1 }}
        >
          <h1>{title}</h1>
          <img className={style.testIcon} src={photo} />
        </m.div>
      </>
    )
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.header}>
        <img className={style.headerIcon} src={HeaderSkull} />
        <h1>TEST YOUR MIGHT</h1>
        <button onClick={() => console.log(maxPushup)}>
          TESTESKLTSEMTLKDSJG:KSDKG:DSG
        </button>
        <img className={style.headerIcon} src={HeaderSkull} />
      </div>
      <div className={style.testDivWrapper}>
        {!state.squat ? (
          <CardDiv photo={BullSKull} type="squat" title="STRONG AS AN OX" />
        ) : (
          <m.div
            animate={{
              x: [-20, 20, -20, 20, 0],
              width: ['20px', '300px'],
            }}
            className={style.flipTestDiv}
          >
            <h1 className="text-[1.4rem] text-black">Test Your Max</h1>
            <input
              type="number"
              onChange={(e) => setSquatMax(e.target.value)}
              className={style.input}
            />
            <button className="text-black">Submit Max</button>
          </m.div>
        )}
        {!state.pushup ? (
          <CardDiv photo={Gladiator} type="pushup" title="SPARTANS, PUSH!" />
        ) : (
          <m.div
            animate={{
              x: [-20, 20, -20, 20, 0],
              width: ['20px', '300px'],
            }}
            className={style.flipTestDiv}
          >
            <h1 className="text-[1.4rem] text-black">Test Your Max</h1>
            <input
              type="number"
              onChange={(e) => setPushUpMax(e.target.value)}
              className={style.input}
            />
            <button className="text-black" onClick={() => upDateMaxData()}>
              Submit Max
            </button>
          </m.div>
        )}
        {!state.pullup ? (
          <CardDiv photo={Dragon} type="pullup" title="WINGS LIKE DRAGON" />
        ) : (
          <m.div
            animate={{
              x: [-20, 20, -20, 20, 0],
              width: ['20px', '300px'],
            }}
            className={style.flipTestDiv}
          >
            <h1 className="text-[1.4rem] text-black">Test Your Max</h1>
            <input
              type="number"
              onChange={(e) => setPullUpMax(e.target.value)}
              className={style.input}
            />
            <button className="text-black">Submit Max</button>
          </m.div>
        )}
      </div>
    </div>
  )
}

export default MaxTestRoom
