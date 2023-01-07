import React, { useEffect, useReducer } from 'react'
import { MainUseContext } from '../context/MainContext'
import { AiFillCheckSquare } from 'react-icons/ai'
import { motion as m } from 'framer-motion'

import PrevSets from './PrevSets'

const reducer = (state, action) => {
  switch (action.type) {
    case 'finish':
      return state.finish === !state.finish
    default:
      throw new Error()
  }
}

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

  const [state, dispatch] = useReducer(reducer, { finish: true })

  const finishWork = () => {
    if (
      con === false &&
      con1 === false &&
      con2 === false &&
      con3 === false &&
      con4 == false
    ) {
      dispatch({ type: 'finish' })
    }
  }

  useEffect(() => {
    finishWork()
  }, [con, con1, con2, con3, con4])

  const style = {
    mainDiv: ` w-[100vw]    flex flex-col mb-[3.5rem] gap-10   items-center  max_md:mt-[4rem]`,
    form: `  roomform flex items-center justify-center   w-[100%]  max_lg:w-[80%] max_md:w-[70%]  h-[500px]  rounded-[8px]`,
    sugheader: `w-[4rem] h-[4rem] text-[2rem] max_md:w-[2.5rem] max_md:text-[1.3rem]   text-center flex justify-center items-center text-gray-400 font-bold border-l-2 border-b-2 rounded-l-[40px] `,
    input: ` pushup-input text-center  w-[9rem] h-[4rem]   text-[3rem] border-b-2 border-r-2 rounded-r-[40px] text-orange-600 flex items-center justify-center`,
    inputDiv: `flex flex-col gap-2 mt-10  `,
    singleInput: ` flex flex-row items-center justify-center gap-10`,
    spanP: `text-gray-400 flex items-center  rounded-[12px] text-center mb-[5px]`,
    button: `${
      !state.finish ? 'bg-[#FFA500]' : null
    }  border-2   rounded-[40px] mr-[6rem] mt-5 font-bold flex w-[16rem] h-[4.3rem] max_md:w-[14rem]   items-center justify-center  text-center text-black`,
  }

  return (
    <div className={style.mainDiv}>
      <PrevSets />
      <form onSubmit={handleSubmit(handlePushupSubmit)} className={style.form}>
        <div className={style.inputDiv}>
          {/* single input div //////////////////////////////////////////////// */}

          <div className={style.singleInput}>
            <h1 className={style.sugheader}>{sug1}</h1>

            {con ? (
              <input
                type="number"
                placeholder="0"
                {...register('setOne')}
                className={style.input}
              />
            ) : (
              <span
                className={`${style.input}   bg-yellow-100 rounded-[12px] `}
              >
                <p className={style.spanP}>{getValues('setOne')}</p>
              </span>
            )}
            <button type="button" onClick={() => setCon(!con)}>
              <AiFillCheckSquare
                className={`${
                  con
                    ? 'text-[4rem]  text-gray-300'
                    : ' text-[4rem]  text-[#54bff5]'
                }`}
              />
            </button>
          </div>
          {/* single input div //////////////////////////////////////////////// */}
          {/* Seconed line of input div starts here /////////////////////////*/}
          <div className={style.singleInput}>
            <h1 className={style.sugheader}>{sug2}</h1>
            {con1 ? (
              <input
                type="number"
                placeholder="0"
                {...register('setTwo')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input}  bg-yellow-100 rounded-[12px]`}>
                <p className={style.spanP}> {getValues('setTwo')} </p>
              </span>
            )}
            <button type="button" onClick={() => setCon1(!con1)}>
              <AiFillCheckSquare
                className={`${
                  con1
                    ? 'text-[4rem] text-gray-300 '
                    : ' text-[4rem]  text-[#54bff5]'
                }`}
              />
            </button>
          </div>
          {/* Secoend line of input div ends here ///////////////////////////// */}
          {/* Theered line of input div starts here/////////////////////////// */}

          <div className={style.singleInput}>
            <h1 className={style.sugheader}>{sug3}</h1>{' '}
            {con2 ? (
              <input
                type="number"
                placeholder="0"
                {...register('setTree')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input}  bg-yellow-100 rounded-[12px]`}>
                <p className={style.spanP}>{getValues('setTree')}</p>
              </span>
            )}
            <button type="button" onClick={() => setCon2(!con2)}>
              <AiFillCheckSquare
                className={`${
                  con2
                    ? 'text-[4rem]  text-gray-300'
                    : ' text-[4rem]   text-[#54bff5]'
                }`}
              />
            </button>
          </div>

          {/* Theered line of input div ends here/////////////////////////// */}
          {/*Forth line of input div starts here/////////////////////// */}
          <div className={style.singleInput}>
            <h1 className={style.sugheader}>{sug4}</h1>{' '}
            {con3 ? (
              <input
                type="number"
                placeholder="0"
                {...register('setFore')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input}  bg-yellow-100 rounded-[12px]`}>
                <p className={style.spanP}>{getValues('setFore')}</p>
              </span>
            )}
            <button type="button" onClick={() => setCon3(!con3)}>
              <AiFillCheckSquare
                className={
                  con3
                    ? 'text-[4rem]  text-gray-300'
                    : ' text-[4rem]   text-[#54bff5]'
                }
              />
            </button>
          </div>
          {/*Forth line of input div ends here/////////////////////// */}

          <div className={style.singleInput}>
            <h1 className={style.sugheader}>{sug5}</h1>{' '}
            {con4 ? (
              <input
                placeholder="0"
                type="number"
                {...register('setFive')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input}  bg-yellow-100 rounded-[12px]`}>
                <p className={style.spanP}>{getValues('setFive')}</p>
              </span>
            )}
            <button type="button" onClick={() => setCon4(!con4)}>
              <AiFillCheckSquare
                className={`${
                  con4
                    ? 'text-[4rem] text-gray-300 '
                    : ' text-[4rem]  text-[#54bff5]'
                }`}
              />
            </button>
          </div>
          <div className={`${'w-[100%] flex     justify-center'}`}>
            <m.button
              whileTap={{
                scale: 1.2,
              }}
              className={style.button}
              type="submit"
            >
              Finish Workout
            </m.button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Workoutroom
