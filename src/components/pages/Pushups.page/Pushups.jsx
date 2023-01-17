import React, { useEffect, useReducer } from 'react'
import { MainUseContext } from '../../../context/MainContext'

import { motion as m } from 'framer-motion'
import { style, inputDiv } from './styles'
import PrevSets from './PrevSets'
import Timer from '../../timer/Timer'
import SidePushUpPannel from './side-pannels/SidePushUpPannel.jsx'

function Pushups() {
  const {
    handlePushupSubmit,
    handleSubmit,
    sug1,
    sug2,
    sug3,
    sug4,
    sug5,
  } = MainUseContext()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'finish':
        return state.finish === !state.finish
      default:
        throw new Error()
    }
  }

  const [con, setCon] = React.useState(true)
  const [con1, setCon1] = React.useState(true)
  const [con2, setCon2] = React.useState(true)
  const [con3, setCon3] = React.useState(true)
  const [con4, setCon4] = React.useState(true)

  const [state, dispatch] = useReducer(reducer, { finish: true })

  const finishWork = () => {
    if (
      con === false &&
      con1 === false &&
      con2 === false &&
      con3 === false &&
      con4 == false
    ) {
      dispatch({ type: 'finish' })
    }
  }

  useEffect(() => {
    finishWork()
  }, [con, con1, con2, con3, con4])

  const btnStyle = {
    button: `${
      !state.finish ? 'bg-[#FFA500]' : null
    }  border-2   rounded-[40px] mr-[6rem] mt-5 font-bold flex w-[16rem] h-[4.3rem] max_md:w-[14rem]   items-center justify-center  text-center text-black`,
  }
  return (
    <>
      {' '}
      <div className={style.mainDiv}>
        <PrevSets />
        <Timer />

        <form
          onSubmit={handleSubmit(handlePushupSubmit)}
          className={style.form}
        >
          <div className={style.inputDiv}>
            {/* single input div //////////////////////////////////////////////// */}
            {inputDiv(con, setCon, 'setOne', sug1)}
            {inputDiv(con1, setCon1, 'setTwo', sug2)}
            {inputDiv(con2, setCon2, 'setThree', sug3)}
            {inputDiv(con3, setCon3, 'setFour', sug4)}
            {inputDiv(con4, setCon4, 'setFive', sug5)}
            <div className={`${'w-[100%] flex     justify-center'}`}>
              <m.button
                whileTap={{
                  scale: 1.2,
                }}
                className={btnStyle.button}
                type="submit"
              >
                Finish Workout
              </m.button>
            </div>
          </div>
        </form>
      </div>
      <SidePushUpPannel style={style} />
    </>
  )
}

export default Pushups
