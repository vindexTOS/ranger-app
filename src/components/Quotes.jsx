import React from 'react'
import { MainUseContext } from '../context/MainContext'
function Quotes() {
  const { randomQuote } = MainUseContext()

  const style = {
    mainDiv: `flex flex-row items-center justify-center w-[350px]     h-[10rem]   border-r-2 border-b-2  rounded-b-[14px]  max_xl:ml-10 `,
    header: `text-center w-[90%] text-[#54bff5]`,
  }

  return (
    <div className={style.mainDiv}>
      <h1 className={style.header}>{randomQuote}</h1>
    </div>
  )
}

export default Quotes
