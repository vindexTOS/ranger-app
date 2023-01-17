import React, { useEffect, useReducer } from 'react'
import inprogress from '../../../utils/png/work-in-progress.png'
import Timer from '../../timer/Timer'
import { motion as m } from 'framer-motion'
import { style, inputDiv } from './styles'
import SidePullUpPannel from './side-pannels/SidePullUpPannel'
import { MainUseContext } from '../../../context/MainContext'
import { PullUpUseContext } from '../../../context/PullUpContext'
import PrevSets from './PrevSets'
function Pullups(props) {
  const {
    handleSubmit,
    handlePullUpSubmit,
    pullupData,
    pullupUid,
    sug1,
    sug2,
    sug3,
    sug4,
    sug5,
  } = PullUpUseContext()

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
      !state.finish ? 'bg-[#FFA500] text-black' : 'text-orange-500'
    }  border-2   rounded-[40px] mr-[6rem] mt-5 font-bold flex w-[16rem] h-[4.3rem] max_md:w-[14rem]   items-center justify-center  text-center `,
  }
  return (
    <>
      <div className={style.mainDiv}>
        <Timer />
        <PrevSets />
        <form
          onSubmit={handleSubmit(handlePullUpSubmit)}
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
      <SidePullUpPannel />
    </>
  )
}

export default Pullups
