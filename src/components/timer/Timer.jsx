import React, { useEffect, useState, useReducer } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { MainUseContext } from '../../context/MainContext'
function Timer() {
  const {
    setDummyState,
    dummyState,
    reducerTimer,
    countDownTimerStarter,
    timeState,
    timerDispatch,
  } = MainUseContext()
  ///reducer function contdowns by 1 seceond and increments and decrements by 15 seconds

  useEffect(() => {
    setTimeout(() => {
      if (timeState.countDown > 0) {
        setDummyState(!dummyState)
        timerDispatch({ type: 'countDown' })
      }
    }, 1000)
  }, [dummyState])

  const styles = {
    mainDiv: `${
      timeState.countDown <= 0
        ? 'hidden'
        : 'w-[50vw] h-[100vh] rounded-[50%] flex  items-center justify-center bg-gray-300 bg-opacity-30 absolute'
    }`,
    timerDiv: `flex flex-row items-center justify-center gap-1  w-[300px] h-[200px] text-[5rem] `,
    timerWrapper: `flex flex-col items-center justify-center`,
    btnWrapper: `text-[5rem] flex flex-row items-center text-center justify-center gap-3`,
    cancelBtn: ``,
  }

  // converting miliseceonds to actual time

  const countDownTimer = (miliseconds) => {
    let total_secoends = parseInt(Math.floor(miliseconds / 1000))
    let total_minutes = parseInt(Math.floor(total_secoends / 60))

    let seconds = parseInt(total_secoends % 60)
    let minutes = parseInt(total_minutes % 60)
    return (
      <div className={styles.timerDiv}>
        <h1>{minutes}</h1>:<h1>{seconds < 9 ? '0' + seconds : seconds}</h1>
      </div>
    )
  }

  const cancelTimer = () => {
    timerDispatch({ type: 'cancel' })
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.timerWrapper}>
        {countDownTimer(timeState.countDown)}
        <div>
          <button
            className={styles.btnWrapper}
            onClick={() => timerDispatch({ type: 'increment' })}
          >
            <p>15 </p>
            <AiOutlinePlusCircle />
          </button>
          <button
            className={styles.btnWrapper}
            onClick={() => timerDispatch({ type: 'decrement' })}
          >
            <p>15 </p> <AiOutlineMinusCircle />
          </button>
          <button className={styles.btnWrapper} onClick={() => cancelTimer()}>
            <p className="text-[2.5rem]"> Skip</p> <ImCancelCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
