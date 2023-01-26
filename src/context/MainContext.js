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
  updateProfile,
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
import { Link, useLocation } from 'react-router-dom'
import { storage } from '../FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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
          procMax = max * 0.5
          // calucating procMax by BMI  inner If statment
          if (BMIconvertor() >= 35) {
            procMax = max * 0.2
          } else if (BMIconvertor() >= 30) {
            procMax = max * 0.3
          } else if (BMIconvertor() > 25) {
            procMax = max * 0.4
          }
          //inner if statemnt
        } else if (Number(userInformationa('User_age')) >= 25) {
          // if user is more than 25 years old we make procMax aka programs starting max for push ups program to 50% instad of 60%
          procMax = max * 0.6
          // calucating procMax by BMI  inner If statment
          if (BMIconvertor() >= 35) {
            procMax = max * 0.3
          } else if (BMIconvertor() >= 30) {
            procMax = max * 0.4
          } else if (BMIconvertor() > 25) {
            procMax = max * 0.5
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
        setSug1(Math.floor(procMax))
        setSug2(Math.floor(procMax) - 2)
        setSug3(Math.floor(procMax - 4))
        setSug4(Math.floor(procMax - 5))
        setSug5(Math.floor(procMax - 6))
        // if user is novice and cant do more than 5 push ups
        if (procMax < 5) {
          setSug1(Math.floor(procMax))
          setSug2(Math.floor(procMax))
          setSug3(Math.floor(procMax))
          setSug4(Math.floor(procMax))
          setSug5(Math.floor(procMax - 1))
        }
        // set one
        if (lastSetCounter('setOne') >= sug1) {
          setSug1(lastSetCounter('setOne') + 1)
        } else if (lastSetCounter('setOne') < sug1) {
          setSug1(procMax - 1)
        }

        // set two
        if (lastSetCounter('setTwo') >= sug2) {
          setSug2(lastSetCounter('setTwo') + 1)
        } else if (lastSetCounter('setTwo') < sug2) {
          setSug2(lastSetCounter('setTwo') - 1)
        }
        // setsetThree
        if (lastSetCounter('setThree') >= sug3) {
          setSug3(lastSetCounter('setThree') + 1)
        } else if (lastSetCounter('setThree') < sug3) {
          setSug3(lastSetCounter('setThree') - 1)
        }
        // set four
        if (lastSetCounter('setFour') >= sug4) {
          setSug4(lastSetCounter('setFour') + 1)
        } else if (lastSetCounter('setFour') < sug4) {
          setSug4(lastSetCounter('setFour') - 1)
        }
        // set five
        if (lastSetCounter('setFive') >= sug5) {
          setSug5(lastSetCounter('setFive') + 1)
        } else if (lastSetCounter('setFive') < sug5) {
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
  React.useEffect(() => {
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

  let testedMax = maxUid

    .filter((val, index) => {
      if (maxUid.length - 1 <= index) {
        return val
      }
    })
    .map((val) => {
      return val.userInfo[0].User_pullUp_Max
    })

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
    totalPushUpCompiler()
  }, [pushupStats])
  let location = useLocation()

  // use reducers for navigation/////////////////////////////////////////////////////////////////////////////////

  const navLinksObj = {
    pullup: location.pathname == '/workroom/pullups',
    achivments: location.pathname == '/workroom/achievements',
    history: location.pathname == '/workroom/history',
    statistics:
      location.pathname == '/workroom/stats/pushup-stats' ||
      location.pathname == '/workroom/stats/pullup-stats' ||
      location.pathname == '/workroom/stats/squat-stats',
    running: location.pathname == '/workroom/running',
    squat: location.pathname == '/workroom/squats',

    pushup: location.pathname == '/workroom/pushups',
  }

  const [dropdown, setDropDown] = useState(false)

  ///timer reducer and functions /////////////////////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////////////
<<<<<<< HEAD

=======
  const [userImg, setUserImg] = useState()
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159
  // const uploadImage = async()=>{
  //const fileRef = ref(storage,'avatar/' + user.uid +'.png')
  //   const snapshot = await uploadBytes(fileRef,)
  //}
<<<<<<< HEAD
  const [image, setImage] = useState(null)
  const [htlmImg, setHtmlImg] = useState(null)
  const [url, setUrl] = useState(null)
  const [userName, setUserName] = useState(null)
  const [sureLoading, setSureLoading] = useState(false)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])

      setHtmlImg(URL.createObjectURL(e.target.files[0]))
    }
  }
  const uploadImg = () => {
    const imageRef = ref(storage, `image${user.uid}`)
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url)
          })
          .catch((error) => {
            console.log(error.message, 'error getting the image url')
          })
        setImage(null)
      })
      .catch((error) => {
        console.log(error.message)
      })
    setSureLoading(true)
  }
  const handlePfpSubmit = async () => {
    const { uid } = user
    if (url !== null) {
      try {
        await addDoc(collection(db, 'user'), {
          pfp: url,
          userName,
          uid,
          timestamp: serverTimestamp(),
          time: Date(),
        })
        navigate('/test')
        console.log('data send')
      } catch (err) {
        console.log(err)
      }
    }
  }
  const [displayName, setDisplayName] = useState(null)
  const [displayPhoto, setDisplayPhoto] = useState(null)
  useEffect(() => {
    const q = query(collection(db, 'user'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let photo = []
      querrySnapShot.forEach((doc) => {
        photo.push({ ...doc.data(), id: doc.id })
      })
      console.log(photo)
      console.log('data resived')
      let userUid = photo
        .filter((item) => {
          if (user.uid === item.uid) {
            return item.uid
          }
        })
        .map((item) => {
          const { pfp } = item
          return pfp
        })
      setDisplayPhoto(
        userUid.filter((val, index) => {
          if (userUid.length - 1 <= index) {
            return val
          }
        }),
      )
      let userUidName = photo
        .filter((item) => {
          if (user.uid === item.uid) {
            return item.uid
          }
        })
        .map((item) => {
          const { userName } = item
          return userName
        })
      let photoFilter = userUidName.filter((val, index) => {
        if (userUidName.length - 1 <= index) {
          return val
        }
      })
      setDisplayName(photoFilter)
      console.log(displayPhoto)
    })
    return () => unsub()
  }, [user])
  const skipFunction = () => {
    navigate('/test')
  }
  /*
   this function also works for future refernces etc .
=======
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159
  const uploadImage = () => {
    if (userImg == null) return
    const imageRef = ref(storage, `avatar/${userImg.name}`)
    uploadBytes(imageRef, userImg).then(() => {
      const photourl = getDownloadURL(imageRef)
      updateProfile(user, { userImgUrl: photourl })
      console.log('img uploaded etc')
    })
<<<<<<< HEAD


  }*/

=======
  }
  const [userImgUrl, setUserImgUrl] = useState()
  useEffect(() => {
    if (user?.photoUrl) {
      setUserImgUrl(user.photoUrl)
      console.log(user.photoUrl)
    }
  }, [])
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159
  return (
    <MainContext.Provider
      value={{
        userImgUrl,
        uploadImage,
        setUserImg,
        userImg,
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

        BMIconvertor,

        dropdown,
        setDropDown,
        reducerTimer,
        setDummyState,
        dummyState,
        timerStarter,
        timeState,
        timerDispatch,
        navLinksObj,
        handleImageChange,
        setUserName,
        uploadImg,

        displayPhoto,
        handlePfpSubmit,
        htlmImg,
        skipFunction,
        sureLoading,
        setSureLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
