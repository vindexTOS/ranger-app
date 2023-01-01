import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MainUseContext } from '../../context/MainContext'
function SignUp() {
  const { SignUp, createUser } = MainUseContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmitUp = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/test')
    } catch (e) {
      console.log(e.message)
      setError(e.message)
    }
  }
  return (
    <section className="h-[100vh]  flex flex-col items-center justify-center border  gap-5">
      <div>
        <h1>Sign up to Ranger Training Course</h1>{' '}
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmitUp}>
        <div className="flex flex-col ">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="border py-2  "
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
        <button className="border bg-blue-600 hover:bg-blue-500 h-[3rem] text-white">
          Register
        </button>
      </form>
      <h1>
        Already have an account ?{' '}
        <Link to="/" className="underline">
          {' '}
          Sign In
        </Link>
      </h1>
    </section>
  )
}

export default SignUp
