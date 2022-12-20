import React, { createContext, useContext } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, db } from '../FirebaseConfig'
import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const MainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const watchlistData = collection(db, 'watchlist')
  const navigate = useNavigate()
  const { handleSubmit, register, getValues } = useForm()

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
  const [pushup, setPushup] = React.useState([])

  const handlePushupSubmit = async (data, e) => {
    e.preventDefault()

    let setOne = getValues('setOne')
    let setTwo = getValues('setTwo')
    let setTree = getValues('setTree')
    let setFore = getValues('setFore')
    let setFive = getValues('setFive')

    if (setOne || setTwo || setTree || setFore || setFive !== '') {
      pushup.push(data)
      console.log(pushup)
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'pushup'), {
        sets: pushup,

        uid,
        timestamp: serverTimestamp(),
      })
    }
  }
  // testing inputs functionality ////

  // get data from firebase //

  const [pushupData, setPushupdata] = React.useState([])

  React.useEffect(() => {
    const q = query(collection(db, 'pushup'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pushUp = []
      querySnapshot.forEach((doc) => {
        pushUp.push({ ...doc.data(), id: doc.id })
      })
      setPushupdata(pushUp)
    })
    return () => unsub()
  }, [])

  // algorithm for push ups //

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
        handlePushupSubmit,
        handleSubmit,
        register,
        pushupData,
        getValues,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
