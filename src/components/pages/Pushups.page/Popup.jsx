import React, { useState, useEffect } from 'react'
import { MainUseContext } from '../../../context/MainContext'
import { motion as m } from 'framer-motion'
import Star from '../../../utils/icons/star.png'
import Load from '../../../utils/icons/load.png'
function Popup() {
  const { pushupStatData, popup, setPopUp } = MainUseContext()
  const style = {
    mainDiv: `w-[90%] h-[100vh] absolute bg-opacity-40 bg-white rounded-[35px] flex flex-col items-center justify-center `,
    p: `text-[9rem] text-orange-300 h-[10rem]`,
    StarDiv: ` flex w-[90%] items-center justify-center   `,
    icon: `w-[15%]`,
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
      <h1 onClick={() => setPopUp(false)}>X</h1>
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

      {!loading ? <p className={style.p}>{pushupStatData[0]}</p> : <Cirlce />}
    </div>
  )
}

export default Popup
