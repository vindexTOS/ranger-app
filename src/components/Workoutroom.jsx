import React from 'react'
import { MainUseContext } from '../context/MainContext'
function Workoutroom() {
  const { pushup, setPushup } = MainUseContext()

  const style = {
    form: `flex items-center justify-center`,

    input: `bg-blue-500 w-[3rem]`,
    inputDiv: `flex flex-col gap-2`,
  }
  return (
    <div>
      <form className={style.form}>
        <div className={style.inputDiv}>
          <input
            type="number"
            className={style.input}
            value={pushup}
            onChange={(e) => setPushup({ setOne: e.target.value })}
          />
          <input
            type="number"
            className={style.input}
            value={pushup}
            onChange={(e) => setPushup({ setTwo: e.target.value })}
          />
          <input
            type="number"
            className={style.input}
            value={pushup}
            onChange={(e) => setPushup({ setTree: e.target.value })}
          />
          <input
            type="number"
            className={style.input}
            value={pushup}
            onChange={(e) => setPushup({ setFore: e.target.value })}
          />
          <input
            type="number"
            className={style.input}
            value={pushup}
            onChange={(e) => setPushup({ setFive: e.target.value })}
          />
        </div>
      </form>
    </div>
  )
}

export default Workoutroom
