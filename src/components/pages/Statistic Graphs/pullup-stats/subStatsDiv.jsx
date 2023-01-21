import React from 'react'

const subStatsDiv = (img, state, title) => {
  const style = {
    div: `flex flex-col items-center justify-center w-[15rem] h-[10rem] border-orange-400  max_sm:w-[50%] max_sm:h-[9rem] max_sm:bg-orange-400  border-l-2 border-b-2 bg-[#fcfcfa] rounded-[5px] `,
    imgicon: `w-[30%]  max_sm:w-[70%] `,
    header: `text-[1.6rem] text-white stats-fonts  max_sm:text-[0.8rem]`,
    statNum: `text-[2rem] text-blue-400  max_sm:text-[2rem] `,
    textShaddow: {
      textShadow: ' 2px 1px 3px #000000',
    },
    textShaddowNum: {
      textShadow: '0px 0px 2px white',
    },
  }
  return (
    <div className={style.div}>
      <img className={style.imgicon} src={img} />
      <h1 className={style.header} style={style.textShaddow}>
        {title}
      </h1>
      <h1 style={style.textShaddowNum} className={style.statNum}>
        {state}
      </h1>
    </div>
  )
}

export default subStatsDiv
