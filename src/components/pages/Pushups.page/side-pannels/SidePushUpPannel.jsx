import React from 'react'
import History from './History'
import Stats from './Stats'
import Quotes from '../../../Quotes'
import { MainUseContext } from '../../../../context/MainContext'
function SidePushUpPannel() {
  const { state } = MainUseContext()
  const style = {
    underline: `w-[90%] h-[1px] bg-gray-300 `,
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

export default SidePushUpPannel
