import React, { useEffect, useState, useReducer } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { MainUseContext } from '../../context/MainContext'
function Timer() {
  const {
    setDummyState,
    dummyState,

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
        : 'w-[50vw] h-[100vh] rounded-[50%] flex   justify-center  bg-gray-500 bg-opacity-50 absolute max_sm:w-[350px] max_sm:h-[350px] max_sm:m-0 max_sm:p-5 text-green-400'
    }`,
    timerDiv: `flex flex-row items-center justify-center gap-1  w-[300px] h-[200px] text-[5rem] max_sm:text-[5rem] `,
    timerWrapper: `flex flex-col items-center justify-center`,
    btnWrapper: `text-[5rem] flex flex-row items-center text-center justify-center gap-3 max_sm:text-[2.4rem]  `,
    cancelBtn: ``,
    btnsWrapper: `flex flex-row`,
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
          {' '}
          <div className={styles.btnsWrapper}>
            <button
              className={styles.btnWrapper}
              onClick={() => timerDispatch({ type: 'increment' })}
            >
              <p>15 </p>
              <AiOutlinePlusCircle className="text-blue-500" />
            </button>
            <button
              className={styles.btnWrapper}
              onClick={() => timerDispatch({ type: 'decrement' })}
            >
              <p>15 </p> <AiOutlineMinusCircle className="text-red-600" />
            </button>
          </div>
          <button className={styles.btnWrapper} onClick={() => cancelTimer()}>
            <p className="text-[2.5rem]"> Skip</p>{' '}
            <ImCancelCircle className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
