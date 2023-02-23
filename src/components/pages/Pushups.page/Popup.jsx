import React, { useState, useEffect } from 'react'
import { MainUseContext } from '../../../context/MainContext'
import { motion as m } from 'framer-motion'
import Star from '../../../utils/icons/star.png'
import Load from '../../../utils/icons/load.png'
function Popup() {
  const { pushupStatData, popup, setPopUp } = MainUseContext()
  const style = {
    mainDiv: `w-[90%] h-[100vh] absolute bg-opacity-40 bg-white rounded-[35px] flex flex-col items-center justify-center `,
    p: `text-[9rem] text-orange-300 h-[10rem] flex flex-col mt-10 items-center justify-center`,
    StarDiv: ` flex w-[90%] items-center justify-center   `,
    icon: `w-[15%]`,
    cancelWrapper: ` cursor-pointer w-[100%]  absolute ml-10 mb-[50rem]`,
    cancel: `text-[4rem] w-[6rem] h-[6rem] flex items-center justify-center  bg-red-500 rounded-[50%]  `,
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [pushupStatData])

  const Cirlce = () => {
    return (
      <m.img
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity }}
        className="w-[10%]"
        src={Load}
      />
    )
  }

  const animationY = () => {
    let y = []
    let i = 0

    while (i < 30) {
      i++
      y.push(2, -2)
    }
    return y
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.cancelWrapper}>
        <m.h1
          animate={{ y: animationY() }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className={style.cancel}
          onClick={() => setPopUp(false)}
        >
          X
        </m.h1>
      </div>
      <div className={style.StarDiv}>
        <m.div
          className={style.icon}
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {' '}
          <m.img
            animate={{ y: animationY() }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            src={Star}
          />
        </m.div>
        <m.div
          className={`${style.icon} mb-20`}
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <m.img
            animate={{ y: animationY() }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            src={Star}
          />
        </m.div>
        <m.div
          className={style.icon}
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {' '}
          <m.img
            animate={{ y: animationY() }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            src={Star}
          />
        </m.div>
      </div>

      {!loading ? (
        <m.p
          animate={{ y: animationY() }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className={style.p}
        >
          <m.p
            animate={{ y: animationY() }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="text-[6rem]"
          >
            TODAYS TOTAL!!!
          </m.p>
          {pushupStatData[0]}
        </m.p>
      ) : (
        <Cirlce />
      )}
    </div>
  )
}

export default Popup
