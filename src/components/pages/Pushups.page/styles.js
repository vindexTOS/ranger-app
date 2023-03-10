import { AiFillCheckSquare } from 'react-icons/ai'
import { MainUseContext } from '../../../context/MainContext'

export const prevStyle = {
  prevPush: ` max_md:w-[4rem]  border-l-2 rounded-l-[50%] rounded-r-[40%]  border-b-2 rounded-[8px] h-[5rem] w-[5rem] flex items-center justify-center`,
  mainDiv: `flex gap-2 max_md:items-center max_md:justify-center   `,
  sets: `text-[2.7rem] text-gray-500 `,
  header: `  z-20     font-bold flex flex-col itmes-center text-center justify-center border-t-2 rounded-t-[40px] w-[30rem] max_md:w-[18rem] max_md:w-[24rem] max_md:ml-[1.2rem] `,
  prevDiv: `w-[100%] h-[9rem]  rounded-[12px]  purp-bg flex flex-col gap-2 items-center justify-center   `,
}

export const inputDiv = (con, setCon, getVal, suggestions) => {
  const { register, getValues, timerStarter, dark } = MainUseContext()
  //input div for push ups / training
  const style = {
    sugheader: `w-[4rem] h-[4rem] text-[2rem] max_md:w-[2.5rem] max_md:text-[1.3rem]   text-center flex justify-center items-center text-gray-400 font-bold border-l-2 border-b-2 rounded-l-[40px] `,
    input: ` pushup-input text-center  w-[9rem] h-[4rem]   text-[3rem] border-b-2 border-r-2 rounded-r-[40px] text-gray-600 flex items-center justify-center`,
    singleInput: ` flex flex-row items-center justify-center gap-10`,
    spanP: `text-gray-400 flex items-center  rounded-[12px] text-center mb-[5px]`,
  }

  return (
    <div className={style.singleInput}>
      <h1 className={style.sugheader}>{suggestions}</h1>

      {con ? (
        <input
          type="number"
          placeholder="0"
          {...register(getVal)}
          className={style.input}
        />
      ) : (
        <span className={`${style.input}   bg-yellow-100 rounded-[12px] `}>
          <p className={style.spanP}>{getValues(getVal)}</p>
        </span>
      )}
      <button type="button" onClick={() => setCon(!con)}>
        <AiFillCheckSquare
          onClick={() => timerStarter()}
          className={`${
            con ? 'text-[4rem]  text-gray-300' : ' text-[4rem]  text-[#54bff5]'
          }`}
        />
      </button>
    </div>
  )
}
