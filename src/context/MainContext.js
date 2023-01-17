import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
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
  where,
  orderBy,
} from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { async } from '@firebase/util'

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
    let setThree = getValues('setThree')
    let setFour = getValues('setFour')
    let setFive = getValues('setFive')
    if (setOne || setTwo || setThree || setFour || setFive !== '') {
      pushup.push(data)
      console.log(pushup)
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'pushup'), {
        sets: pushup,
        time: Date(),
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
      console.log(pushUp)
      let userUid = pushUp
        .filter((item, index) => {
          if (user.uid === item.uid) {
            return item.uid
          }
        })
        .map((item, index) => {
          const { uid } = item
          return uid
        })

      let lastUserUid = userUid
        .filter((item, index) => {
          if (userUid.length - 1 <= index) {
            return item
          }
        })
        .join('')
      console.log(user.uid)
      console.log(lastUserUid)
      if (lastUserUid == user.uid) {
        setPushupdata(pushUp)
      }
    })
    return () => unsub()
  }, [user])

  // specifice user pushup Uid finder ////////
  let pushupUid = pushupData.filter((val) => {
    if (user !== null) {
      if (user.uid == val.uid) {
        return val
      }
    }
  })
  useEffect(() => {}, [pushupData])
  // algorithm for push ups //
  // user data is stored next state named maxPushup/setmaxPushup() ///////////////////////////////////
  const [userData, setUserData] = useState([])
  /// form values

  /// async function
  const userDataSubmit = async (data) => {
    let user_age = getValues('User_age')
    let user_gender = getValues('User_gender')
    let user_smokes = getValues('User_smokes')
    let kg_lb = getValues('im_me')
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
      navigate('/workroom/pushups')
    }
  }
  // use effect for max
  // this also works as full user info store
  const [maxPushup, setMaxpushup] = React.useState([])
  React.useEffect(() => {
    if (user == null) return
    const q = query(collection(db, 'user_data'), orderBy('timestamp'))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let newMax = []
      querySnapshot.forEach((doc) => {
        newMax.push({ ...doc.data(), id: doc.id })
      })
      setMaxpushup(newMax)
    })

    return () => unsub()
  }, [user])

  // pulling out full user info for algorithm

  let userInfoUid = maxPushup.filter((val) => {
    if (user !== null) {
      if (user.uid == val.uid) {
        return val
      }
    }
  })

  // push up alogithm starts here/////////////////////////////////////////////////////////////

  const [sug1, setSug1] = useState(0)
  const [sug2, setSug2] = useState(0)
  const [sug3, setSug3] = useState(0)
  const [sug4, setSug4] = useState(0)
  const [sug5, setSug5] = useState(0)
  // push ups suggestions calculator
  // finding speficie user max when sighn in
  let maxUid = maxPushup.filter((val) => {
    if (user !== null) {
      if (user.uid == val.uid) {
        return val
      }
    }
  })
  // pulling specific information from firebase user info doc check line 148 for key values for this specific data

  const userInformationa = (specificInfo) => {
    let newVal = userInfoUid.filter((item, index) => {
      //filtering and getting last value
      if (userInfoUid.length - 1 <= index) {
        return item
      }
    })
    //mapping the filterd value
    let newUserInfo = newVal.map((val) => {
      let newVal = val.userInfo[0][specificInfo]

      return newVal
    })

    return newUserInfo
  }
  // this function converts pounds in to kilograms and converts data in to BMI
  const BMIconvertor = () => {
    let userHeight = Number(userInformationa('User_height'))
    let userWeight = Number(userInformationa('User_weight'))
    let resultBMI = 0
    if (userInformationa('im_me') == 'Imperial') {
      let inchesTocm = userHeight / 3.281

      let lbToKg = userWeight / 2.22
      return lbToKg / Math.pow(2, inchesTocm - 0.1)
    } else {
      let metricHeight = userHeight / 100
      return userWeight / Math.pow(2, metricHeight - 0.1)
    }
  }
  const pushUpalgo = () => {
    //first set of the last workout user did from firebase IP
    const lastSetCounter = (set) => {
      let newVal = pushupUid.filter((item, index) => {
        //filtering and getting last value
        if (pushupUid.length - 1 <= index) {
          return item
        }
      })
      //mapping the filterd value
      let setOneMapped = newVal.map((val) => {
        let newVal = val.sets[0][set]

        return newVal
      })
      let newNum = parseInt(setOneMapped.join())

      return newNum
    }

    const newVal = maxUid.map((item, index) => {
      if (maxUid.length - 1 <= index) {
        let procMax = 0

        let max = parseInt(item.userMax)
        if (Number(userInformationa('User_age')) >= 40) {
          // if user is more than 40 years old we make procMax aka programs starting max for push ups program to 40% instad of 50% or 60%
          procMax = max * 0.4
          // calucating procMax by BMI  inner If statment
          if (BMIconvertor() >= 35) {
            procMax = max * 0.2
          } else if (BMIconvertor() >= 30) {
            procMax = max * 0.3
          } else if (BMIconvertor() > 25) {
            procMax = max * 0.35555
          }
          //inner if statemnt
        } else if (Number(userInformationa('User_age')) >= 25) {
          // if user is more than 25 years old we make procMax aka programs starting max for push ups program to 50% instad of 60%
          procMax = max * 0.5
          // calucating procMax by BMI  inner If statment
          if (BMIconvertor() >= 35) {
            procMax = max * 0.3
          } else if (BMIconvertor() >= 30) {
            procMax = max * 0.4
          } else if (BMIconvertor() > 25) {
            procMax = max * 0.4555
          }
          //inner if statemnt
        } else if (Number(userInformationa('User_age')) < 25) {
          procMax = max * 0.6
          // calucating procMax by BMI  inner If statment
          if (BMIconvertor() >= 35) {
            procMax = max * 0.4
          } else if (BMIconvertor() >= 30) {
            procMax = max * 0.5
          } else if (BMIconvertor() < 25) {
            procMax = max * 0.6
          }
          //inner if statemnt
        }
        // this returns 60% of max pushup input
        setSug1(procMax)
        setSug2(procMax - 2)
        setSug3(procMax - 4)
        setSug4(procMax - 5)
        setSug5(procMax - 6)
        // set one
        if (lastSetCounter('setOne') >= procMax) {
          setSug1(lastSetCounter('setOne') + 3)
        } else if (lastSetCounter('setOne') >= procMax + 2) {
          setSug1(lastSetCounter('setOne') + 4)
        } else if (lastSetCounter('setOne') >= procMax + 4) {
          setSug1(lastSetCounter('setOne') + 5)
        } else if (lastSetCounter('setOne') < sug1) {
          setSug1(procMax - 1)
        }
        // set two
        if (lastSetCounter('setTwo') >= sug2) {
          setSug2(lastSetCounter('setTwo') + 2)
        }
        if (lastSetCounter('setTwo') >= sug2 + 2) {
          setSug2(lastSetCounter('setTwo') + 3)
        }
        if (lastSetCounter('setTwo') >= sug2 + 4) {
          setSug2(lastSetCounter('setTwo') + 4)
        }
        if (lastSetCounter('setTwo') < sug2) {
          setSug2(sug2 - 1)
        }
        // setsetThree
        if (lastSetCounter('setThree') >= sug3) {
          setSug3(lastSetCounter('setThree') + 1)
        }
        if (lastSetCounter('setThree') >= sug3 + 2) {
          setSug3(lastSetCounter('setThree') + 2)
        }
        if (lastSetCounter('setThree') >= sug3 + 4) {
          setSug3(lastSetCounter('setThree') + 3)
        }
        if (lastSetCounter('setThree') < sug3) {
          setSug3(sug3 - 1)
        }
        // set four
        if (lastSetCounter('setFour') >= sug4) {
          setSug4(lastSetCounter('setFour') + 2)
        }
        if (lastSetCounter('setFour') >= sug4 + 2) {
          setSug4(lastSetCounter('setFour') + 2)
        }
        if (lastSetCounter('setFour') >= sug4 + 4) {
          setSug4(lastSetCounter('setFour') + 3)
        }
        if (lastSetCounter('setFour') < sug4) {
          setSug4(sug4 - 1)
        }
        // set five
        if (lastSetCounter('setFive') >= sug5) {
          setSug5(lastSetCounter('setFive') + 2)
        }
        if (lastSetCounter('setFive') >= sug5 + 2) {
          setSug5(lastSetCounter('setFive') + 2)
        }
        if (lastSetCounter('setFive') >= sug5 + 3) {
          setSug5(lastSetCounter('setFive') + 3)
        }
        if (lastSetCounter('setFive') < sug5) {
          setSug5(sug5 - 1)
        }
      }
    })
    return newVal
  }
  React.useEffect(() => {
    pushUpalgo()
  }, [maxPushup, pushupData])
  // getting date from firebase date function
  const [timestamp, setTimeStamp] = useState(null)
  React.useEffect(() => {
    let newTime = pushupUid
      .filter((val, index) => {
        if (pushupUid.length - 1 <= index) {
          return val
        }
      })
      .map((val) => {
        return val.time
      })
      .join('')
      .slice(0, 24)
    setTimeStamp(newTime)
  }, [pushupData])

  /// quote api and random quote generator
  const [quote, setQuote] = useState([])
  let qouteUrl = `https://type.fit/api/quotes`
  const [randomQuote, setRandomQuote] = useState(null)

  React.useEffect(() => {
    fetch(qouteUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setQuote(data)
      })
    let topArry = quote.map((val) => {
      return val.text
    })

    let randomizer = Math.floor(Math.random() * topArry.length)

    let newRandom = topArry[randomizer]
    setRandomQuote(newRandom)
  }, [user])

  // stats functions
  const [pushupStats, setpushupStats] = useState(null)

  React.useEffect(() => {
    const statsFunction = () => {
      let newMap = pushupUid.map((val) => {
        let setOne = Number(val.sets[0].setOne)
        let setTwo = Number(val.sets[0].setTwo)
        let setThree = Number(val.sets[0].setThree)
        let setFour = Number(val.sets[0].setFour)
        let setFive = Number(val.sets[0].setFive)
        let num = null

        for (let i = 0; i < val.sets.length; i++) {
          num = setOne + setTwo + setThree + setFour + setFive
        }
        return num
      })
      setpushupStats(newMap)
    }
    statsFunction()
  }, [pushupData])

  // statistics logic
  const [totalPushups, setTotalpushups] = React.useState(null)

  let workoutmax = 0
  pushupUid.map((val) => {
    let setOne = Number(val.sets[0].setOne)
    let setTwo = Number(val.sets[0].setTwo)
    let setThree = Number(val.sets[0].setTree)
    let setFour = Number(val.sets[0].setFore)
    let setFive = Number(val.sets[0].setFive)
    if (workoutmax < setOne) {
      workoutmax = setOne
    }
    if (workoutmax < setTwo) {
      workoutmax = setTwo
    }
    if (workoutmax < setThree) {
      workoutmax = setThree
    }
    if (workoutmax < setFour) {
      workoutmax = setFour
    }
    if (workoutmax < setFive) {
      workoutmax = setFive
    }
  })
  const maxUidStore = async () => {
    try {
      setTimeout(() => {
        if (maxUid[0].userMax !== undefined) {
          settestedMax(maxUid[0].userMax.join(''))
        }
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const [testedMax, settestedMax] = React.useState(null)
  const totalPushUpCompiler = async () => {
    try {
      setTimeout(() => {
        let pushupStatReducer = pushupStats.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        )
        setTotalpushups(pushupStatReducer)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    maxUidStore()
    totalPushUpCompiler()
  }, [pushupStats])

  // use reducers for navigation
  const reducer = (state, action) => {
    switch (action.type) {
      case 'pushup':
        return {
          pushup: (state.pushup = true),
          pullup: (state.pullup = false),
          squat: (state.squat = false),
          running: (state.running = false),
          statistics: (state.statistics = false),
          history: (state.history = false),
          achivments: (state.achivments = false),
        }
      case 'pullup':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pullup = true),
          squat: (state.squat = false),
          running: (state.running = false),
          statistics: (state.statistics = false),
          history: (state.history = false),
          achivments: (state.achivments = false),
        }
      case 'squat':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pullup = false),
          squat: (state.squat = true),
          running: (state.running = false),
          statistics: (state.statistics = false),
          history: (state.history = false),
          achivments: (state.achivments = false),
        }
      case 'running':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pushup = false),
          squat: (state.squat = false),
          running: (state.running = true),
          statistics: (state.statistics = false),
          history: (state.history = false),
          achivments: (state.achivments = false),
        }
      case 'statistics':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pullup = false),
          squat: (state.squat = false),
          running: (state.running = false),
          statistics: (state.statistics = true),
          history: (state.history = false),
          achivments: (state.achivments = false),
        }
      case 'history':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pullup = false),
          squat: (state.squat = false),
          running: (state.running = false),
          statistics: (state.statistics = false),
          history: (state.history = true),
          achivments: (state.achivments = false),
        }
      case 'achivments':
        return {
          pushup: (state.pushup = false),
          pullup: (state.pullup = false),
          squat: (state.squat = false),
          running: (state.running = false),
          statistics: (state.statistics = false),
          history: (state.history = false),
          achivments: (state.achivments = true),
        }
      case 'dropdown':
        return { dropdown: !state.dropdown }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    pushup: true,
    pullup: false,
    squat: false,
    running: false,
    statistics: false,
    history: false,
    achivments: false,
    dropdown: false,
  })
  ///timer reducer and functions ///////
  const reducerTimer = (state, action) => {
    switch (action.type) {
      case 'countDown':
        return { countDown: state.countDown - 1000 }
      case 'decrement':
        return { countDown: state.countDown - 15000 }
      case 'increment':
        return { countDown: state.countDown + 15000 }
      case 'cancel':
        return { countDown: (state.countDown = 0) }
      case 'reset':
        return { countDown: (state.countDown = 120000) }
    }
  }

  const [timeState, timerDispatch] = useReducer(reducerTimer, {
    countDown: 0,
  })

  // this dummy state prevents state.countDown to re render and re activate useEffect twice in a row
  const [dummyState, setDummyState] = useState(false)
  const timerStarter = () => {
    timerDispatch({ type: 'reset' })
    setDummyState(!dummyState)
  }

  /////////////////////////////////////////////////

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
        maxUid,
        pushupUid,
        sug1,
        sug2,
        sug3,
        sug4,
        sug5,
        timestamp,
        randomQuote,
        quote,
        pushupStats,
        totalPushups,
        testedMax,
        workoutmax,
        userData,
        userInfoUid,
        userInformationa,
        dispatch,
        BMIconvertor,
        state,
        reducerTimer,
        setDummyState,
        dummyState,
        timerStarter,
        timeState,
        timerDispatch,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
