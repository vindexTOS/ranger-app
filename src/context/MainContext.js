import React, { createContext, useContext } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, db } from '../FirebaseConfig'
import { collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const MainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const watchlistData = collection(db, 'watchlist')
  const navigate = useNavigate()

  const [user, setUser] = React.useState({})
  // user creation in firebase
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // signe in hanndler
  const signin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // sign out hanndler
  const logOut = () => {
    signOut(auth)
  }
  const handleLogOut = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }
  //changing different users hanndle
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)

      setUser(currentUser)
    })
    return () => {
      unsub()
    }
  }, [])

  // push up workout updates

  const [pushup, setPushup] = React.useState({
    setOne: 0,
    setTwo: 0,
    setTree: 0,
    setFore: 0,
    setFive: 0,
  })
  return (
    <MainContext.Provider
      value={{
        createUser,
        logOut,
        signin,
        user,
        watchlistData,
        setPushup,
        pushup,
        handleLogOut,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
