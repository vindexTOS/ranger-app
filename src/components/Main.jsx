import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { useNavigate } from 'react-router'
import Workoutroom from './Workoutroom'
import Navbar from './Navbar'
import History from './History'
import Quotes from './Quotes'
import Sidenavigation from './Sidenavigation'
import Stats from './Stats'
function Main() {
  const { quote, randomQuote, randomizerQuote } = MainUseContext()

  const style = {
    mainDiv: ` w-[100vw] h-[100%]   workoutroomdiv`,
    workDiv: ` flex  flex-row  w-[90%] h-[90%]  gap-10 mt-20 ml-10 items-center justify-between   `,
    compDiv: `flex flex-col gap-10 mb-[14.9rem]  `,
    sidenav: `flex flex-col w-[900px]`,
  }

  return (
    <div className={style.mainDiv}>
      <Navbar />
      <div className={style.workDiv}>
        <Sidenavigation />
        <Workoutroom />
        <div className={style.compDiv}>
          <History />

          <Quotes />
        </div>
      </div>
    </div>
  )
}

export default Main
