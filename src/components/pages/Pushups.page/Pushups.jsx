import React, { useEffect, useReducer } from 'react'
import { MainUseContext } from '../../../context/MainContext'

import { motion as m } from 'framer-motion'
import { inputDiv } from './styles'
import PrevSets from './PrevSets'
import Timer from '../../timer/Timer'
import SidePushUpPannel from './side-pannels/SidePushUpPannel.jsx'
import Popup from './Popup'
function Pushups() {
  const {
    handlePushupSubmit,
    handleSubmit,
    sug1,
    sug2,
    sug3,
    sug4,
    sug5,
    dark,
    popup,
  } = MainUseContext()
  const style = {
    mainDiv: ` w-[100%] h-[100%]   flex flex-col mb-[3.5rem] gap-10   items-center  max_md:mt-[4rem] `,
    form: `  roomform flex items-center justify-center  w-[100%]  max_lg:w-[80%] max_md:w-[70%]  h-[500px]  rounded-[8px]`,
    sugheader: `w-[4rem] h-[4rem] text-[2rem] max_md:w-[2.5rem] max_md:text-[1.3rem]   text-center flex justify-center items-center text-gray-400 font-bold border-l-2 border-b-2 rounded-l-[40px] `,
    input: ` pushup-input text-center  w-[9rem] h-[4rem]   text-[3rem] border-b-2 border-r-2 rounded-r-[40px] text-gray-600 flex items-center justify-center`,
    inputDiv: `flex flex-col gap-2 mt-10  `,
    singleInput: ` flex flex-row items-center justify-center gap-10`,
    spanP: `text-gray-400 flex items-center  rounded-[12px] text-center mb-[5px]`,
  }
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
            {inputDiv(con, setCon, 'setOne', Math.round(sug1))}
            {inputDiv(con1, setCon1, 'setTwo', Math.round(sug2))}
            {inputDiv(con2, setCon2, 'setThree', Math.round(sug3))}
            {inputDiv(con3, setCon3, 'setFour', Math.round(sug4))}
            {inputDiv(con4, setCon4, 'setFive', Math.round(sug5))}
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
      {popup && <Popup />}
    </>
  )
}

export default Pushups
