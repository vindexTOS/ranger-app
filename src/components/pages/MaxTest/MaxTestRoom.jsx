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
    upDatePushUpData,
    upDatePullUpData,
    upDateSquatData,
    maxPushup,
    setSquatMax,
    setPushUpMax,
    setPullUpMax,
    testedMax,
  } = MainUseContext()
  const { testedMaxSquat } = SquatUseContext()
  const { testedMaxPullUp } = PullUpUseContext()

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
    flipTestDiv: `w-[300px] h-[80%] rounded-[19px] bg-orange-200 cardshaddow flex flex-col items-center justify-center gap-5 text-orange-200 text-[1.3rem] gap-2 cursor-pointer border-r-2`,
    input: `rounded-[8px] w-[11rem] h-[6rem] text-[5rem] text-center outline-none   `,
    cardHeader: `flex items-center justify-center bg-orange-200 text-center text-[1.6rem] border-2  border-red-500 text-red-500 w-[11rem] h-[6rem] rounded-[8px]`,
    inputBtn: `text-orange-200  bg-red-500 w-[11rem] h-[6rem] rounded-[8px]`,
    prevMaxHeader: `text-red-500 border-2 p-4 border-red-500 rounded-[8px]`,
  }
  const animations = {
    frontCardFlip: {
      x: [-20, 20, -20, 20, 0],
      width: ['20px', '300px'],
    },
    flipHeader: {
      x: [-20, 20, -20, 20, 0],
      y: [-10, 10, -10, 10, 0],
      width: ['1.2rem', '11rem'],
      fontSize: ['0.5rem', '1.6rem'],
    },
    flipBottomHeader: {
      x: [-20, 20, -20, 20, 0],
      y: [-10, 10, -10, 10, 0],
      width: ['1.2rem', '11rem'],
      fontSize: ['0.5rem', '1rem'],
    },

    Hover: {
      x: [-2, 2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2],
      y: [2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2, -2],
    },
  }
  const CardDiv = ({ photo, type, title }) => {
    return (
      <>
        <m.div
          onClick={() => dispatch({ type: `${type}` })}
          className={style.testDiv}
          whileHover={animations.Hover}
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

        <img className={style.headerIcon} src={HeaderSkull} />
      </div>
      <div className={style.testDivWrapper}>
        {!state.squat ? (
          <CardDiv photo={BullSKull} type="squat" title="STRONG AS AN OX" />
        ) : (
          <m.div
            animate={animations.frontCardFlip}
            className={style.flipTestDiv}
          >
            <m.h1 animate={animations.flipHeader} className={style.cardHeader}>
              TEST YOUR SQUAT MAX
            </m.h1>
            <m.input
              animate={animations.flipHeader}
              type="number"
              onChange={(e) => setSquatMax(e.target.value)}
              className={style.input}
            />
            <m.button
              animate={animations.flipHeader}
              className={style.inputBtn}
              onClick={() => upDateSquatData()}
            >
              <h1> SUBMIT MAX</h1>
            </m.button>
            <m.h1
              animation={animations.flipBottomHeader}
              className={style.prevMaxHeader}
            >
              Your Max <span className="text-blue-400">{testedMax}</span>
            </m.h1>
          </m.div>
        )}
        {!state.pushup ? (
          <CardDiv photo={Gladiator} type="pushup" title="SPARTANS, PUSH!" />
        ) : (
          <m.div
            animate={animations.frontCardFlip}
            className={style.flipTestDiv}
          >
            <m.h1 className={style.cardHeader} animate={animations.flipHeader}>
              Test Your Push Up Max
            </m.h1>
            <m.input
              animate={animations.flipHeader}
              type="number"
              onChange={(e) => setPushUpMax(e.target.value)}
              className={style.input}
            />
            <m.button
              animate={animations.flipHeader}
              className={style.inputBtn}
              onClick={() => upDatePushUpData()}
            >
              <h1>Submit Max</h1>
            </m.button>
            <m.h1
              className={style.prevMaxHeader}
              animation={animations.flipBottomHeader}
            >
              Your Max <span className="text-blue-400">{testedMaxSquat}</span>
            </m.h1>
          </m.div>
        )}
        ,
        {!state.pullup ? (
          <CardDiv photo={Dragon} type="pullup" title="WINGS LIKE DRAGON" />
        ) : (
          <m.div
            animate={animations.frontCardFlip}
            className={style.flipTestDiv}
          >
            <m.h1 className={style.cardHeader} animate={animations.flipHeader}>
              Test Your Pull Up Max
            </m.h1>
            <input
              animate={animations.flipHeader}
              type="number"
              onChange={(e) => setPullUpMax(e.target.value)}
              className={style.input}
            />
            <m.button
              animate={animations.flipHeader}
              className={style.inputBtn}
              onClick={() => upDatePullUpData()}
            >
              <h1> Submit Max</h1>
            </m.button>
            <m.h1
              className={style.prevMaxHeader}
              animation={animations.flipBottomHeader}
            >
              Your Max <span className="text-blue-400">{testedMaxPullUp}</span>
            </m.h1>
          </m.div>
        )}
      </div>
    </div>
  )
}

export default MaxTestRoom
