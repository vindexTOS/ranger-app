import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { useNavigate } from 'react-router'
import Workoutroom from './Workoutroom'
import Navbar from './Navbar'
import History from './History'
import Quotes from './Quotes'
import Sidenavigation from './Sidenavigation'

function Main() {
  const { quote, randomQuote, randomizerQuote } = MainUseContext()

  const style = {
    mainDiv: ` w-[100vw] h-[100%]   workoutroomdiv`,
    workDiv: ` flex  flex-row  w-[90%] h-[100%]  gap-10 mt-20 ml-[4rem] max_xl:ml-20 max_Xll:ml-[5rem] items-center justify-between max_xl:gap-5     `,
    compDiv: `flex flex-col gap-10 mb-[14.9rem] max_lg:hidden     `,
    sidenav: `flex flex-col w-[50%]`,
  }

  return (
    <div className={style.mainDiv}>
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
