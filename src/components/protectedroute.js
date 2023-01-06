import React from 'react'
import { Navigate } from 'react-router-dom'
import { MainUseContext } from '../context/MainContext'

function Protectedroute({ children }) {
  const { user } = MainUseContext()

  if (!user) {
    return <Navigate to="/"></Navigate>
  } else {
    return children
  }
}

export default Protectedroute
