import React from 'react'
import ErrorIcon from '../../utils/Error.png'
import { Link } from 'react-router-dom'
import { motion as m } from 'framer-motion'
function Error() {
  const repaet = () => {
    let arr = []
    for (let i = 0; i < 100; i++) {
      arr.push(1.2, 2)
    }
    return arr
  }
  return (
    <div className=" flex flex-col items-center justify-center w-[100vw] h-[100vh] ">
      <Link className="text-[2rem] text-blue-400" to="/workroom/pushups">
        <m.h1
          animate={{ scale: repaet() }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        >
          Go Back!
        </m.h1>
      </Link>
      <img src={ErrorIcon} />
    </div>
  )
}

export default Error
