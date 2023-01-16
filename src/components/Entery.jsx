import React, { useState } from 'react'
import { MainUseContext } from '../context/MainContext'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { GiCigarette, GiWeightScale } from 'react-icons/gi'
import { motion as m } from 'framer-motion'
function Entery() {
  const style = {
    mainDiv: ` enterydiv w-[100%] h-[100vh] flex items-center justify-center `,
    form: `enteryform w-[50%] h-[500px] rounded-[8px] flex flex-col gap-4   justify-center  p-10  about-div max_sm:mt-5 max_sm:h-[80%] max_sm:w-[90%] max_lg:w-[60%] max_lg:h-[80%]`,
    input: `outline entery-input`,
    inputDiv: `flex flex-col  gap-3 border-b-2`,
    weightDiv: `flex flex-row`,
    label: `flex flex-row items-center   gap-2`,
    button: `border  hover:bg-blue-500 mt-5 h-[3rem] text-white rounded-[15px] w-[50%] flex  items-center justify-center gap-2`,
  }

  const {
    register,
    pushupData,
    getValues,
    handleSubmit,
    userDataSubmit,
    userData,
  } = MainUseContext()

  /*const pushUps = () => {
    let pushUp = parseInt(getValues('User_max'))

    console.log(pushUp * 0.6)
  }*/

  return (
    <div className={style.mainDiv}>
      <form onSubmit={handleSubmit(userDataSubmit)} className={style.form}>
        <div className={style.inputDiv}>
          <input
            {...register('User_age')}
            type="number"
            placeholder="Age"
            className={style.input}
          />
        </div>
        <div className={style.inputDiv}>
          <label className={`${style.label} text-[#54bff5]`}>
            {' '}
            <BsGenderAmbiguous className="text-pink-400" /> Gender
          </label>
          <select {...register('User_gender')} className={`${style.input} `}>
            <option className="text-[#54bff5]">Male</option>
            <option className="text-pink-600">Female</option>
          </select>
        </div>
        <div className={style.inputDiv}>
          <label className={`${style.label} text-[#54bff5]`}>
            <GiCigarette className="text-yellow-500" />
            Do you smoke ?
          </label>
          <select {...register('User_smokes')} className={style.input}>
            <option>Yes</option>
            <option>Passive</option>
            <option>None Smoker</option>
          </select>
        </div>
        <div className={style.inputDiv}>
          <div className={style.weightDiv}>
            {' '}
            <select {...register('im_me')}>
              <option>Metric</option>
              <option>Imperial</option>
            </select>
            <input
              {...register('User_weight')}
              className={style.input}
              placeholder="Weight"
            />
            <input
              {...register('User_height')}
              className={style.input}
              placeholder="Height"
            />
          </div>
        </div>
        <div className={style.inputDiv}>
          <label className="text-[#54bff5]">
            How many reps can you do on one set for each exercises ? Do them now
            and input your data
          </label>
          <input
            {...register('User_max')}
            className={style.input}
            type="number"
            placeholder="Max Push Ups"
          />
          <input
            {...register('User_pullUp_Max')}
            className={style.input}
            type="number"
            placeholder="Max Pull Ups"
          />
          <input
            {...register('User_squat_Max')}
            className={style.input}
            type="number"
            placeholder="Max Squats"
          />
        </div>
        <div className="w-[100%] flex items-center justify-center">
          <m.button
            type="submit"
            onClick={() => console.log(userData)}
            className={style.button}
            style={{
              background: 'linear-gradient(160deg, #54bff5 0%, #34ffc5 100%)',
            }}
            whileHover={{
              background: 'linear-gradient(160deg, #34ffc5 0%,  #54bff5 100%)',
            }}
          >
            Submit
          </m.button>
        </div>
      </form>
    </div>
  )
}

export default Entery
