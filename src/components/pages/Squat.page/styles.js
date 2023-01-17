import { AiFillCheckSquare } from 'react-icons/ai'
import { MainUseContext } from '../../../context/MainContext'
import { SquatUseContext } from '../../../context/SquatContext'
export const style = {
  mainDiv: ` w-[100%]     flex flex-col mb-[3.5rem] gap-10   items-center  max_md:mt-[4rem]`,
  form: `  roomform flex items-center justify-center  w-[100%]  max_lg:w-[80%] max_md:w-[70%]  h-[500px]  rounded-[8px]`,
  sugheader: `w-[4rem] h-[4rem] text-[2rem] max_md:w-[2.5rem] max_md:text-[1.3rem]   text-center flex justify-center items-center text-blue-400  font-bold border-l-2 border-b-2 border-blue-400 rounded-l-[40px] `,
  input: ` pushup-input text-center  w-[9rem] h-[4rem] border-blue-400  text-[3rem] border-b-2 border-r-2 rounded-r-[40px] text-blue-800  flex items-center justify-center`,
  inputDiv: `flex flex-col gap-2 mt-10  `,
  singleInput: ` flex flex-row items-center justify-center gap-10`,
  spanP: `text-blue-400  flex items-center   rounded-[12px] text-center mb-[5px]`,
}

export const prevStyle = {
  prevPush: ` max_md:w-[4rem] border-blue-400 border-l-2 rounded-l-[50%] rounded-r-[40%]  border-b-2 rounded-[8px] h-[5rem] w-[5rem] flex items-center justify-center`,
  mainDiv: `flex gap-2 max_md:items-center max_md:justify-center   `,
  sets: `text-[2.7rem] text-gray-500  text-blue-400 `,
  header: `  z-20     font-bold flex flex-col itmes-center text-center justify-center border-blue-400 border-t-2 rounded-t-[40px] w-[30rem] max_md:w-[18rem] max_md:w-[24rem] max_md:ml-[1.2rem] `,
  prevDiv: `w-[100%] h-[9rem]  rounded-[12px]  purp-bg flex flex-col gap-2 items-center justify-center   `,
}

export const inputDiv = (con, setCon, getVal, suggestions) => {
  const { timerStarter } = MainUseContext()
  const { register, getValues } = SquatUseContext()
  //input div for push ups / training
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
