import { async } from '@firebase/util'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { MainUseContext } from '../../context/MainContext'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiTwotoneMail } from 'react-icons/ai'
import { SlLogin } from 'react-icons/sl'
function SignIn() {
  const navigate = useNavigate()

  const { signin } = MainUseContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signin(email, password)
      navigate('/main')
    } catch (e) {
      console.log(e.message)
      setError('user not found or login info is wrong !')

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const style = {
    section: `signin h-[100vh] w-[100%] flex flex-col items-center justify-center border  gap-5`,
    form: `form flex flex-col items-center  justify-center gap-5 w-[500px] h-[300px]  rounded-[8px] max_sm:w-[90%] `,
    button: `border  hover:bg-blue-500 mt-5 h-[3rem] text-white rounded-[15px] w-[50%] flex  items-center justify-center gap-2`,
    inputDiv: `flex flex-row items-center justify-center gap-2 border-b-2`,
    labelDiv: 'flex flex-col w-[50%]',
    icon: `text-gray-400`,
  }

  return (
    <section className={style.section}>
      <div className="flex flex-col gap-2 items-center">
        <h1> Ranger Training Course</h1>{' '}
        <p>
          Learn more{' '}
          <Link to="/about" className="underline">
            About
          </Link>
        </p>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.labelDiv}>
          <div className={style.inputDiv}>
            <AiTwotoneMail className={style.icon} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className={` w-[80%] py-2 `}
            />
          </div>
        </div>
        <div className={style.labelDiv}>
          <div className={style.inputDiv}>
            {' '}
            <RiLockPasswordFill className={style.icon} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className=" w-[80%] py-2"
            />
          </div>
        </div>
        <h1 style={{ color: 'red' }}>{error}</h1>
        <m.button
          type="submit"
          className={style.button}
          style={{
            background: 'linear-gradient(160deg, #54bff5 0%, #34ffc5 100%)',
          }}
          whileHover={{
            background: 'linear-gradient(160deg, #34ffc5 0%,  #54bff5 100%)',
          }}
        >
          Sign In <SlLogin />
        </m.button>
      </form>
      <h1>
        Don't have an account ?{' '}
        <Link to="/signup" className="underline text-orange-600">
          {' '}
          Sign Up
        </Link>
      </h1>
    </section>
  )
}

export default SignIn
