import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useRef,
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
  where,
  setDoc,
  doc,
  updateDoc,
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
      // console.log(currentUser)

      setUser(currentUser)
    })
    return () => {
      unsub()
    }
  }, [])

  // push up workout updates
  const [pushup, setPushup] = React.useState([])
  const [popup, setPopUp] = React.useState(false)
  const handlePushupSubmit = async (data, e) => {
    e.preventDefault()

    let setOne = getValues('setOne')
    let setTwo = getValues('setTwo')
    let setThree = getValues('setThree')
    let setFour = getValues('setFour')
    let setFive = getValues('setFive')
    if (
      setOne !== '' ||
      setTwo !== '' ||
      setThree !== '' ||
      setFour !== '' ||
      setFive !== ''
    ) {
      setPopUp(true)
      pushup.push(data)
      // console.log(pushup)
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
      // console.log(pushUp)
      let userUid = pushUp
        .filter((item, index) => {
          if (user?.uid === item.uid) {
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
      // console.log(user?.uid)
      // console.log(lastUserUid)
      if (lastUserUid == user?.uid) {
        setPushupdata(pushUp)
      }
    })
    return () => unsub()
  }, [user])

  // specifice user pushup Uid finder ////////
  let pushupUid = pushupData.filter((val) => {
    if (user !== null) {
      if (user?.uid == val.uid) {
        return val
      }
    }
  })
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
    let userMax = parseInt(getValues('User_max'))
    let userPullupMax = parseInt(getValues('User_pullUp_Max'))
    let userSquatMax = parseInt(getValues('User_squat_Max'))

    if (userMax > 0) {
      userData.push(data)
      const { uid } = auth.currentUser

      await addDoc(collection(db, 'user_data'), {
        userInfo: userData,
        userMax,

        userPullupMax,
        userSquatMax,
        pfp: url,
        userName,
        timestamp: serverTimestamp(),
        uid,
      })
      // navigate to main page
      navigate('/workroom/pushups')
      setSureLoading(false)
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
      if (user?.uid == val.uid) {
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
      if (user?.uid == val.uid) {
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
  // this state takes date and time where total collected push ups was done
  const [pushupStatData, setPushupStatData] = useState([])
  /// use effect calls two above functions

  useEffect(() => {
    if (pushupStats && pushupStats.length > 0) {
      setTimeout(() => {
        // this gives us time Date from API
        let totalPushUps = pushupStats?.map((val) => {
          return { 'Total Push Ups': val }
        })
        let prevVal = totalPushUps[totalPushUps?.length - 1]['Total Push Ups']
        let prevCurr = totalPushUps[totalPushUps?.length - 2]['Total Push Ups']
        // console.log(totalPushUps)
        setPushupStatData([prevVal, prevCurr])
      }, 1000)
    }
  }, [pushupStats])

  const pushUpalgo = () => {
    //first set of the last workout user did from firebase IP
    const lastSetCounter = (set) => {
      let newVal = pushupUid?.filter((item, index) => {
        //filtering and getting last value
        if (pushupUid.length - 1 <= index) {
          return item
        }
      })
      //mapping the filterd value
      let setMapped = newVal.map((val) => {
        let newVal = val.sets[0][set]

        return newVal
      })
      let newNum = parseInt(setMapped.join())

      return newNum
    }

    const newVal = maxUid?.map((item, index) => {
      if (maxUid.length - 1 <= index) {
        let procMax = 0

        let max = parseInt(item.userMax)
        if (Number(userInformationa('User_age')) >= 40) {
          // if user is more than 40 years old we make procMax aka programs starting max for  squat program to 40% instad of 50% or 60%
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
          // if user is more than 25 years old we make procMax aka programs starting max for squat program to 50% instad of 60%
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

        // this returns 60% of max squats input
        setSug1(Math.floor(procMax))
        setSug2(Math.floor(procMax) - 2)
        setSug3(Math.floor(procMax - 4))
        setSug4(Math.floor(procMax - 5))
        setSug5(Math.floor(procMax - 6))
        // if user is novice and cant do more than 5 squats
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
  }, [pushupStatData, maxPushup, pushupData])
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
      return val.userMax
    })

  const totalPushUpCompiler = async () => {
    try {
      setTimeout(() => {
        let pushupStatReducer = pushupStats?.reduce(
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
    pullup: location.pathname === '/workroom/pullups',
    achivments: location.pathname === '/workroom/achievements',
    history: location.pathname === '/workroom/history',
    statistics:
      location.pathname === '/workroom/stats/pushup-stats' ||
      location.pathname === '/workroom/stats/pullup-stats' ||
      location.pathname === '/workroom/stats/squat-stats',
    running: location.pathname === '/workroom/running',
    squat: location.pathname === '/workroom/squats',

    pushup: location.pathname === '/workroom/pushups',
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
  // pulling doc id
  const [docId, setDocId] = useState('')

  useEffect(() => {
    const docIdPuller = () => {
      maxPushup.filter((val) => {
        if (val.uid == user?.uid) {
          setDocId(val.id)
        }
      })
    }
    return docIdPuller()
  }, [user, maxPushup])

  const [userImg, setUserImg] = useState()

  const [image, setImage] = useState(null)
  const [htlmImg, setHtmlImg] = useState(null)
  const [url, setUrl] = useState(null)
  const [userName, setUserName] = useState('')
  const [upDateName, setUpdateName] = useState('')
  const [sureLoading, setSureLoading] = useState(false)
  const [nameEdit, setNameEdit] = useState(false)

  const [photoEdit, setPhotoEdit] = useState(false)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])

      setHtmlImg(URL.createObjectURL(e.target.files[0]))
    }
  }
  const uploadImg = () => {
    const imageRef = ref(storage, `image${user?.uid}`)
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
    setSureLoading(!sureLoading)
    setHtmlImg(null)
  }
  const updateUserPhoto = async () => {
    const docRef = doc(db, 'user_data', docId)
    try {
      await updateDoc(docRef, {
        pfp: url,
      })
      setTimeout(() => {
        setSureLoading(!sureLoading)
      }, 1000)
    } catch (error) {}
  }
  const updateUserName = async () => {
    const docRef = doc(db, 'user_data', docId)
    try {
      await updateDoc(docRef, {
        userName: userName,
      })
      setNameEdit(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  const [displayName, setDisplayName] = useState(null)
  const [displayPhoto, setDisplayPhoto] = useState(null)
  const [userProfiles, setUserProfiles] = useState(null)
  useEffect(() => {
    const q = query(collection(db, `user_data`), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let photo = []
      querrySnapShot.forEach((doc) => {
        photo.push({ ...doc.data(), id: doc.id })
      })
      // console.log(photo)
      // console.log('data resived')

      let userUid = photo
        .filter((item) => {
          if (user?.uid === item.uid) {
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
          if (user?.uid === item.uid) {
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
      setUserProfiles(photo)
      // console.log(displayPhoto)
    })
    // console.log('re render ? ')

    return () => unsub()
  }, [user])

  const skipFunction = () => {
    navigate('/test')
  } /* const userFinder = async () => {
    const q = query(
      collection(db, 'user'),
      where('displayName', '==', displayName.toString()),
    )
    try {
      const query = await getDocs(q)
      query.forEach((doc)=>{

      })
    } catch (error) {
      
    }
  }*/
  /*
   this function also works for future refernces etc .
 
  const uploadImage = () => {
    if (userImg == null) return
    const imageRef = ref(storage, `avatar/${userImg.name}`)
    uploadBytes(imageRef, userImg).then(() => {
      const photourl = getDownloadURL(imageRef)
      updateProfile(user, { userImgUrl: photourl })
      console.log('img uploaded etc')
    })

    
 }*/

  // Re test your max states and fucntions updating  data on firebase sied on userInfo
  const [userSquatMax, setSquatMax] = useState('')
  const [userMax, setPushUpMax] = useState(0)
  const [userPullupMax, setPullUpMax] = useState('')

  const upDatePushUpData = async () => {
    const ref = doc(db, 'user_data', docId)
    try {
      await updateDoc(ref, {
        userMax,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  const upDatePullUpData = async () => {
    const ref = doc(db, 'user_data', docId)
    try {
      await updateDoc(ref, {
        userPullupMax,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  const upDateSquatData = async () => {
    const ref = doc(db, 'user_data', docId)
    try {
      await updateDoc(ref, {
        userSquatMax,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  /// dark mode
  const darkFromLocal = JSON.parse(localStorage.getItem('dark') || true)

  const [dark, setDark] = useState(darkFromLocal)
  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark))
  }, [dark])

  //ref for drop down menu click
  let refClick = useRef(null)
  //drop down setings state
  const [settingDrop, setSettingDrop] = useState(false)

  return (
    <MainContext.Provider
      value={{
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
        uploadImg,
        displayName,
        displayPhoto,
        htlmImg,
        skipFunction,
        sureLoading,
        setSureLoading,
        photoEdit,
        setPhotoEdit,
        userName,
        setUserName,
        setSquatMax,
        setPushUpMax,
        setPullUpMax,
        maxPushup,
        upDatePushUpData,
        upDatePullUpData,
        upDateSquatData,
        userProfiles,
        updateUserPhoto,
        updateUserName,
        dark,
        setDark,
        navLinksObj,
        refClick,

        settingDrop,
        setSettingDrop,
        nameEdit,
        setNameEdit,
        pushupStatData,
        popup,
        setPopUp,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const MainUseContext = () => {
  return useContext(MainContext)
}
