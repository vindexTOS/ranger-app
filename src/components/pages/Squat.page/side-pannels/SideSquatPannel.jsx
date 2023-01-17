import React from 'react'
import History from './History'
import Stats from './Stats'
import Quotes from '../../../Quotes'
import { MainUseContext } from '../../../../context/MainContext'
function SideSquatPannel() {
  const { state } = MainUseContext()
  const style = {
    underline: `w-[90%] h-[1px] bg-blue-400 `,
    compDiv: `flex flex-col items-center justify-center gap-5  mb-10 max_lg:hidden  ${
      state.statistics && 'hidden'
    }   `,
  }
  return (
    <div className={style.compDiv}>
      <History />
      <div className={style.underline}></div>

      <Stats />
      <div className={style.underline}></div>

      <Quotes />
    </div>
  )
}

export default SideSquatPannel
