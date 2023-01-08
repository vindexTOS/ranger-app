import React from 'react'
import { MainUseContext } from '../context/MainContext'
import DropDownNav from './navigation/DropDownNav'
import History from './History'
import Quotes from './Quotes'
import Sidenavigation from './navigation/Sidenavigation'
import Stats from './Stats'
import { Outlet } from 'react-router-dom'

function Main() {
  const { state } = MainUseContext()

  const style = {
    mainDiv: ` w-[100vw] h-[100%]   workoutroomdiv`,
    workDiv: ` flex  flex-row  w-[90%] ] h-[100%]  gap-10 mt-5 ml-[4rem] max_md:ml-0 max_xl:ml-20 max_Xll:ml-[5rem] items-center justify-between max_xl:gap-5     `,
    compDiv: `flex flex-col items-center justify-center gap-5  mb-10 max_lg:hidden     `,
    sidenav: `flex flex-col w-[50%]`,
    underline: `w-[90%] h-[1px] bg-gray-300 `,
    outlet: `w-[500px]`,
  }

  return (
    <div className={style.mainDiv}>
      {state.dropdown && <DropDownNav />}

      <div className={style.workDiv}>
        <Sidenavigation />
        <Outlet />

        <div className={style.compDiv}>
          <History />
          <div className={style.underline}></div>

          <Stats />
          <div className={style.underline}></div>

          <Quotes />
        </div>
      </div>
    </div>
  )
}

export default Main
