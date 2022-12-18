import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { AiFillCheckSquare } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
function Workoutroom() {
  const {
    pushup,
    setPushup,
    handlePushupSubmit,
    handleSubmit,
    register,
    pushupData,
  } = MainUseContext()

  const [con, setCon] = React.useState({
    set1: true,
    set2: true,
    set3: true,
    set4: true,
    set5: true,
  })

  const style = {
    form: `flex items-center justify-center `,

    input: `bg-blue-500 w-[9rem] h-[2rem] text-black`,
    inputDiv: `flex flex-col gap-2`,
    singleInput: ` flex flex-row items-center justify-center`,
  }

  return (
    <div>
      <button type="button" onClick={() => console.log(pushupData)}>
        Click test
      </button>
      <form onSubmit={handleSubmit(handlePushupSubmit)} className={style.form}>
        <div className={style.inputDiv}>
          {/* single input div //////////////////////////////////////////////// */}

          <div className={style.singleInput}>
            {con.set1 ? (
              <input
                type="number"
                name="setOne"
                {...register('setOne')}
                className={style.input}
              />
            ) : (
              <span className={style.input}>{pushupData[0].setOne}</span>
            )}
            <button type="button" onClick={() => setCon({ set1: !true })}>
              <AiFillCheckSquare
                className={`${
                  con.set1 ? 'text-[2.5rem] ' : ' text-[2.5rem]  text-[#e69b3a]'
                }`}
              />
            </button>
          </div>
          {/* single input div //////////////////////////////////////////////// */}

          <input
            type="number"
            name="setOne"
            {...register('setTwo')}
            className={style.input}
          />
          <input
            type="number"
            name="setOne"
            {...register('setTree')}
            className={style.input}
          />
          <input
            type="number"
            name="setOne"
            {...register('setFore')}
            className={style.input}
          />
          <input
            type="number"
            name="setOne"
            {...register('setFive')}
            className={style.input}
          />
        </div>
        <button>Submit </button>
      </form>
    </div>
  )
}

export default Workoutroom
