import React, { useState } from 'react'
import { MainUseContext } from '../context/MainContext'
function Entery() {
  const style = {
    mainDiv: ` w-[100vw] h-[100vh] flex items-center justify-center `,
    form: `flex flex-col gap-5`,
    input: `outline`,
    inputDiv: `flex flex-col gap-2`,
    weightDiv: `flex flex-row`,
  }

  const { register, pushupData, getValues, handleSubmit } = MainUseContext()

  const [userData, setUserData] = useState({})

  const userFormSubmit = (data) => {
    setUserData(data)
  }

  const pushUps = () => {
    let pushUp = getValues('User_max')
    return pushUp
  }

  return (
    <div className={style.mainDiv}>
      <form onSubmit={handleSubmit(userFormSubmit)} className={style.form}>
        <div className={style.inputDiv}>
          <label>Age</label>
          <input
            {...register('User_age')}
            type="number"
            className={style.input}
          />
        </div>
        <div className={style.inputDiv}>
          <label>Gender</label>
          <select {...register('User_gender')} className={style.input}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className={style.inputDiv}>
          <label>Are you an somker ?</label>
          <select {...register('User_smokes')} className={style.input}>
            <option>Yes</option>
            <option>Passive</option>
            <option>None Smoker</option>
          </select>
        </div>
        <div className={style.inputDiv}>
          <div className={style.weightDiv}>
            {' '}
            <select {...register('kg_lb')} className="outline">
              <option>Kg</option>
              <option>Lb</option>
            </select>
            <input {...register('User_weight')} className={style.input} />
          </div>
        </div>
        <div className={style.inputDiv}>
          <label>
            How many push ups can you do on one set ? Do them now and input your
            data
          </label>
          <input
            {...register('User_max')}
            className={style.input}
            type="number"
            placeholder="Max Push Ups"
          />
        </div>
        <button type="submit" onClick={() => console.log(userData)}>
          SUbmit
        </button>
      </form>
    </div>
  )
}

export default Entery
