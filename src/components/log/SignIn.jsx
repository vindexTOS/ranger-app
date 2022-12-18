import { async } from '@firebase/util'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MainUseContext } from '../../context/MainContext'
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
      setError(e.message)
    }
  }

  return (
    <section className="h-[100vh]  flex flex-col items-center justify-center border  gap-5">
      <div>
        <h1>Ranger Training Course</h1>{' '}
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border py-2"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border py-2"
          />
        </div>
        <button
          type="submit"
          className="border bg-blue-600 hover:bg-blue-500 h-[3rem] text-white"
        >
          Sign In
        </button>
      </form>
      <h1>
        Don't have an account ?{' '}
        <Link to="/signup" className="underline">
          {' '}
          Sign Up
        </Link>
      </h1>
    </section>
  )
}

export default SignIn
