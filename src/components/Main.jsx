import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { useNavigate } from 'react-router'
import Workoutroom from './Workoutroom'
import Navbar from './Navbar'
import History from './History'
function Main() {
  const { user, handleLogOut, pushupData } = MainUseContext()

  const style = {
    workDiv: ` flex flex-row  items-center justify-center   w-[100vw] h-[100vh]`,
  }

  return (
    <div className=" w-[100vw] h-[100%] workoutroomdiv">
      <Navbar />

      <div className={style.workDiv}>
        <Workoutroom />
        {Date()}
        <History />
      </div>
    </div>
  )
}

export default Main
