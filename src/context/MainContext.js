import React, { createContext, useContext, useState } from 'react'
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
  const [userData, setUserData] = useState([])
  /// form values

  /// async function
  const userDataSubmit = async (data) => {
    let user_age = getValues('User_age')
    let user_gender = getValues('User_gender')
    let user_smokes = getValues('User_smokes')
    let kg_lb = getValues('kg_lb')
    let user_weight = getValues('User_weight')
    let user_max = parseInt(getValues('User_max'))

    if (user_max > 0) {
      userData.push(data)
      const { uid } = auth.currentUser
      const maxReps = () => {
        let newData = userData.map((item) => {
          return item.User_max
        })
        return newData
      }
      await addDoc(collection(db, 'user_data'), {
        userInfo: userData,
        userMax: maxReps(),
        timestamp: serverTimestamp(),
        uid,
      })
      // navigate to main page
    }
  }
  // use effect for max

  const [maxPushup, setMaxpushup] = React.useState([])
  React.useEffect(() => {
    const q = query(collection(db, 'user_data'), orderBy('timestamp'))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let newMax = []
      querySnapshot.forEach((doc) => {
        newMax.push({ ...doc.data(), id: doc.id })
      })
      setMaxpushup(newMax)
    })

    return () => unsub()
  }, [])

  // push up alogithm starts here/////////////////////////////////////////////////////////////

  const [sug1, setSug1] = useState(0)
  const [sug2, setSug2] = useState(0)
  const [sug3, setSug3] = useState(0)
  const [sug4, setSug4] = useState(0)
  const [sug5, setSug5] = useState(0)
  // push ups suggestions calculator

  const pushUpalgo = () => {
    // set data is stored here
    //first set of the last workout user did from firebase IP
    const setOneMap = () => {
      let newVal = pushupData.filter((item, index) => {
        //filtering and getting last value
        if (pushupData.length - 1 <= index) {
          return item
        }
      })
      //mapping the filterd value
      let setOneMapped = newVal.map((val) => {
        let newVal = val.sets[0].setOne

        return newVal
      })
      let newNum = parseInt(setOneMapped.join())

      return newNum
    }

    // setTwo

    const setTwoMap = () => {
      let newVal = pushupData.filter((item, index) => {
        if (pushupData.length - 1 <= index) {
          return item
        }
      })
      // mapping

      let setTwoMapped = newVal.map((val) => {
        let newVal = val.sets[0].setTwo

        return newVal
      })
      let newNum = parseInt(setTwoMapped.join())

      return newNum
    }
    // setTree

    const setTreeMap = () => {
      let newVal = pushupData.filter((item, index) => {
        if (pushupData.length - 1 <= index) {
          return item
        }
      })

      //mapping

      let setTreeMapped = newVal.map((val) => {
        let newVal = val.sets[0].setTree

        return newVal
      })
      let newNum = parseInt(setTreeMapped.join())
      return newNum
    }
    // set  four mapping

    const setFourMap = () => {
      let newVal = pushupData.filter((item, index) => {
        if (pushupData.length - 1 <= index) {
          return item
        }
      })

      //mapping

      let setFourMapped = newVal.map((val) => {
        let newVal = val.sets[0].setFore

        return newVal
      })
      let newNum = parseInt(setFourMapped.join())
      return newNum
    }

    // set four ends here
    /// set five start
    const setFiveMap = () => {
      let newVal = pushupData.filter((item, index) => {
        if (pushupData.length - 1 <= index) {
          return item
        }
      })

      //mapping

      let setFiveMapped = newVal.map((val) => {
        let newVal = val.sets[0].setFive

        return newVal
      })
      let newNum = parseInt(setFiveMapped.join())
      return newNum
    }

    const newVal = maxPushup.map((item, index) => {
      if (maxPushup.length - 1 <= index) {
        let max = parseInt(item.userMax)
        // this returns 60% of max pushup input
        let procMax = max * 0.6

        setSug1(procMax)
        setSug2(procMax - 2)
        setSug3(procMax - 4)
        setSug4(procMax - 5)
        setSug5(procMax - 6)
        // set one
        if (setOneMap() >= procMax) {
          setSug1(setOneMap() + 1)
        }
        if (setOneMap() >= procMax + 2) {
          setSug1(setOneMap() + 2)
        }
        if (setOneMap() >= procMax + 4) {
          setSug1(setOneMap() + 3)
        }
        if (setOneMap() < procMax) {
          setSug1(procMax - 1)
        }

        // set two
        if (setTwoMap() >= sug2) {
          setSug2(setTwoMap() + 1)
        }
        if (setTwoMap() >= sug2 + 2) {
          setSug2(setTwoMap() + 2)
        }
        if (setTwoMap() >= sug2 + 4) {
          setSug2(setTwoMap() + 3)
        }
        if (setTwoMap() < sug2) {
          setSug2(sug2 - 1)
        }
        // set three

        if (setTreeMap() >= sug3) {
          setSug3(setTreeMap() + 1)
        }
        if (setTreeMap() >= sug3 + 2) {
          setSug3(setTreeMap() + 2)
        }
        if (setTreeMap() >= sug3 + 4) {
          setSug3(setTreeMap() + 3)
        }
        if (setTreeMap() < sug3) {
          setSug3(sug3 - 1)
        }
        // set four
        if (setFourMap() >= sug4) {
          setSug4(setFourMap() + 2)
        }
        if (setFourMap() >= sug4 + 2) {
          setSug4(setFourMap() + 2)
        }
        if (setFourMap() >= sug4 + 4) {
          setSug4(setFourMap() + 3)
        }
        if (setFourMap() < sug4) {
          setSug4(sug4 - 1)
        }
        // set five
        if (setFiveMap() >= sug5) {
          setSug5(setFiveMap() + 2)
        }
        if (setFiveMap() >= sug5 + 2) {
          setSug5(setFiveMap() + 2)
        }
        if (setFiveMap() >= sug5 + 4) {
          setSug5(setFiveMap() + 3)
        }
        if (setFiveMap() < sug5) {
          setSug5(sug5 - 1)
        }
      }
    })
    console.log('n')
    return newVal
  }
  React.useEffect(() => {
    pushUpalgo()
  }, [pushupData])

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
        userDataSubmit,
        pushUpalgo,
        userData,
        maxPushup,

        sug1,
        sug2,
        sug3,
        sug4,
        sug5,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
