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
    mainDiv: ` w-[100%]   flex flex-col mb-10    items-center gap-10`,
    form: `btnshaddow roomform flex items-center justify-center   w-[100%] max_md:w-[90%]  h-[500px] bg-white rounded-[8px]`,
    sugheader: `w-[4rem] h-[4rem] text-[2rem] max_md:w-[2.5rem] max_md:h-[1.9rem]   text-center flex justify-center items-center text-white font-bold bg-yellow-500`,
    input: `bg-[#ffd31d]  w-[9rem] h-[4rem] max_md:h-[2rem] text-[3rem]  text-[#54bff5] flex items-center justify-center`,
    inputDiv: `flex flex-col gap-2 mt-10`,
    singleInput: ` flex flex-row items-center justify-center gap-2`,
    spanP: `text-white flex items-center  text-center mb-[5px]`,
    button: `btnshaddow mt-5 font-bold flex w-[14rem] h-[3rem] max_md:w-[9rem] max_md:h-[2rem]  items-center justify-center rounded-[12px] text-center text-white`,
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
                {...register('setOne')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input}  bg-blue-300 `}>
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
                {...register('setTwo')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input} bg-blue-300`}>
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
                {...register('setTree')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input} bg-blue-300`}>
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
                {...register('setFore')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input} bg-blue-300`}>
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
                type="number"
                {...register('setFive')}
                className={style.input}
              />
            ) : (
              <span className={`${style.input} bg-blue-300`}>
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
          <div className="w-[100%] flex   justify-center">
            <m.button
              className={style.button}
              style={{
                background: 'linear-gradient(160deg, #54bff5 0%, #34ffc5 100%)',
              }}
              whileHover={{
                background:
                  'linear-gradient(160deg, #34ffc5 0%,  #54bff5 100%)',
                color: 'white',
              }}
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
