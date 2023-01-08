import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { TfiQuoteLeft, TfiQuoteRight } from 'react-icons/tfi'
function Quotes() {
  const { randomQuote } = MainUseContext()

  const style = {
    mainDiv: `flex flex-col items-center justify-center w-[350px]  gap-2   h-[10rem]   border-r-2 border-b-2  rounded-b-[14px]  max_xl:ml-10 `,
    header: `text-center w-[90%] text-gray-500`,
    underline: `w-[40%] h-[2px] bg-orange-300 rounded-[50%]`,
    icon: `text-orange-300`,
  }

  return (
    <div className={style.mainDiv}>
      <TfiQuoteLeft className={style.icon} />
      <div className={style.underline}></div>

      <h1 className={style.header}>{randomQuote}</h1>
      <div className={style.underline}></div>
      <TfiQuoteRight className={style.icon} />
    </div>
  )
}

export default Quotes
