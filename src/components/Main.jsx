import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { useNavigate } from 'react-router'
import Workoutroom from './Workoutroom'
import Navbar from './Navbar'
function Main() {
  const { user, handleLogOut } = MainUseContext()

  const style = {
    workDiv: ` flex flex-col gap-6 items-center justify-center w-[100vw] h-[100vh]`,
  }
  return (
    <div className=" w-[100vw] h-[100%] workoutroomdiv">
      <Navbar />

      <div className={style.workDiv}>
        <Workoutroom />
      </div>
    </div>
  )
}

export default Main
