import React, { useEffect } from 'react'
import { MainUseContext } from '../context/MainContext'
import { AiFillCheckSquare } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
import PrevSets from './PrevSets'
function Workoutroom() {
  const {
    pushup,
    setPushup,
    pushupData,
    handlePushupSubmit,
    handleSubmit,
    register,
    user,
    getValues,
    maxPushup,
    pushUpalgo,
    sug1,
    sug2,
    sug3,
    sug4,
    sug5,
  } = MainUseContext()

  const [con, setCon] = React.useState(true)
  const [con1, setCon1] = React.useState(true)
  const [con2, setCon2] = React.useState(true)
  const [con3, setCon3] = React.useState(true)
  const [con4, setCon4] = React.useState(true)

  const style = {
    mainDiv: ` w-[100%] flex flex-col  items-center gap-4`,
    form: `flex items-center justify-center w-[50%] h-[500px] bg-white`,

    input: `bg-blue-500 w-[9rem] h-[2rem] text-black`,
    inputDiv: `flex flex-col gap-2`,
    singleInput: ` flex flex-row items-center justify-center gap-2`,
  }

  return (
    <div className={style.mainDiv}>
      <PrevSets />
      <form onSubmit={handleSubmit(handlePushupSubmit)} className={style.form}>
        <div className="flex flex-col">
          <h1>{sug1}</h1>
          <h1>{sug2}</h1>
          <h1>{sug3}</h1>
          <h1>{sug4}</h1>
          <h1>{sug5}</h1>
        </div>
        <div className={style.inputDiv}>
          {/* single input div //////////////////////////////////////////////// */}

          <div className={style.singleInput}>
            {con ? (
              <input
                type="number"
                {...register('setOne')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{getValues('setOne')}</span>
            )}
            <button type="button" onClick={() => setCon(!con)}>
              <AiFillCheckSquare
                className={`${
                  con ? 'text-[2.5rem] ' : ' text-[2.5rem]  text-[#e69b3a]'
                }`}
              />
            </button>
          </div>
          {/* single input div //////////////////////////////////////////////// */}
          {/* Seconed line of input div starts here /////////////////////////*/}
          <div className={style.singleInput}>
            {con1 ? (
              <input
                type="number"
                {...register('setTwo')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{getValues('setTwo')}</span>
            )}
            <button type="button" onClick={() => setCon1(!con1)}>
              <AiFillCheckSquare
                className={`${
                  con1 ? 'text-[2.5rem] ' : ' text-[2.5rem]  text-[#e69b3a]'
                }`}
              />
            </button>
          </div>
          {/* Secoend line of input div ends here ///////////////////////////// */}
          {/* Theered line of input div starts here/////////////////////////// */}

          <div className={style.singleInput}>
            {con2 ? (
              <input
                type="number"
                {...register('setTree')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{getValues('setTree')}</span>
            )}
            <button type="button" onClick={() => setCon2(!con2)}>
              <AiFillCheckSquare
                className={`${
                  con2 ? 'text-[2.5rem]' : 'text-[2.5rem] text-[#e69b3a]'
                }`}
              />
            </button>
          </div>

          {/* Theered line of input div ends here/////////////////////////// */}
          {/*Forth line of input div starts here/////////////////////// */}
          <div className={style.singleInput}>
            {con3 ? (
              <input
                type="number"
                {...register('setFore')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{getValues('setFore')}</span>
            )}
            <button type="button" onClick={() => setCon3(!con3)}>
              <AiFillCheckSquare
                className={
                  con3 ? 'text-[2.5rem]' : 'text-[2.5rem] text-[#e69b3a]'
                }
              />
            </button>
          </div>
          {/*Forth line of input div ends here/////////////////////// */}

          <div className={style.singleInput}>
            {con4 ? (
              <input
                type="number"
                {...register('setFive')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{getValues('setFive')}</span>
            )}
            <button type="button" onClick={() => setCon4(!con4)}>
              <AiFillCheckSquare
                className={`${
                  con4 ? 'text-[2.5rem] ' : ' text-[2.5rem]  text-[#e69b3a]'
                }`}
              />
            </button>
          </div>
        </div>
        <button type="submit">Submit </button>
      </form>
    </div>
  )
}

export default Workoutroom
