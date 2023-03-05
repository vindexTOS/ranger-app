import React, { useContext, createContext, useState, useEffect } from 'react'
import { MainUseContext } from './MainContext'
import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { auth, db } from '../FirebaseConfig'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
const PullUpContext = createContext()

export const PullUpContextProvider = ({ children }) => {
  const {
    user,
    maxPushup,
    BMIconvertor,
    userInformationa,
    userPullupMax,
  } = MainUseContext() // pulling main context
  const { handleSubmit, register, getValues } = useForm() /// form hook

  //sending pull up data to firestore////////////////////////////////////////////////////////////////////////////

  const [pullup, setPullUp] = useState([])

  const handlePullUpSubmit = async (data, e) => {
    e.preventDefault()
    let setOne = getValues('setOne')
    let setTwo = getValues('setTwo')
    let setThree = getValues('setThree')
    let setFour = getValues('setFour')
    let setFive = getValues('setFive')

    if (setOne || setTwo || setThree || setFour || setFive !== '') {
      setPopUp(true)
      pullup.push(data)
      // console.log(pullup)
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'pullups'), {
        sets: pullup,
        time: Date(),

        timestamp: serverTimestamp(),
        uid,
      })
    }
  }
  /// pop up
  const [popup, setPopUp] = React.useState(false)
  // pop up
  /////pulling pull up data to firestore////////////////////////////////////////////////////////////////////////////

  const [pullupData, setPullUpdata] = React.useState([])
  const pullUpDataPuller = async () => {
    const q = query(collection(db, 'pullups'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pullup = []
      querySnapshot.forEach((doc) => {
        pullup.push({ ...doc.data(), id: doc.id })
      })

      let userUid = pullup
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

      if (lastUserUid == user?.uid) {
        setPullUpdata(pullup)
      }
    })
    return () => unsub()
  }
  useEffect(() => {
    pullUpDataPuller()
  }, [user])
  //// filtering pull up data based on user UID////////////////////////////////////////////////////////////////////////////

  let pullupUid = pullupData.filter((val) => {
    if (user !== null) {
      if (val.uid === user?.uid) {
        return val
      }
    }
  })
  const [timestamp, setTimeStamp] = useState(null)
  React.useEffect(() => {
    let newTime = pullupUid
      .filter((val, index) => {
        if (pullupUid.length - 1 <= index) {
          return val
        }
      })
      .map((val) => {
        return val.time
      })
      .join('')
      .slice(0, 24)
    setTimeStamp(newTime)
  }, [pullupData])
  //// pulling out max pull ups from user_data for algorithm and statistics///////////////////////////////////////////////////////
  let maxPullUpUid = maxPushup.filter((val) => {
    if (user !== null) {
      if (user.uid == val.uid) {
        return val
      }
    }
  })
  // useEffect(() => {
  //   // console.log(maxPushup)
  //   // console.log(maxPullUpUid)
  //   // console.log(userPullupMax)
  // }, [maxPushup, maxPullUpUid, userPullupMax])
  /// algorithm for pull ups //////////////////////////////////////////////////////////////////////////////////////////////////////
  const [sug1, setSug1] = useState(0)
  const [sug2, setSug2] = useState(0)
  const [sug3, setSug3] = useState(0)
  const [sug4, setSug4] = useState(0)
  const [sug5, setSug5] = useState(0)
  // user PR and functions for statistics /////////////////////////////////////////////////////////////////////////////////////////////////
  const [pullupStats, setPullUpStats] = useState(null)
  const statsFunction = () => {
    let newMap = pullupUid.map((val) => {
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
    setPullUpStats(newMap)
  }
  React.useEffect(() => {
    statsFunction()
  }, [pullupData])

  const [pullupStatData, setpullUpStatData] = useState([])

  /// use effect calls two above functions
  useEffect(() => {
    if (pullupStats && pullupStats.length > 0) {
      // this gives us time Date from API
      setTimeout(() => {
        let totalPullups = pullupStats?.map((val) => {
          return { 'Total Pull Ups': val }
        })
        let prevVal = totalPullups[totalPullups?.length - 1]['Total Pull Ups']
        let prevCurr = totalPullups[totalPullups?.length - 2]['Total Pull Ups']
        setpullUpStatData([prevVal, prevCurr])
      }, 1000)
    }
  }, [pullupStats])

  const PullUpalgo = () => {
    //first set of the last workout user did from firebase IP
    const lastSetCounter = (set) => {
      let newVal = pullupUid?.filter((item, index) => {
        //filtering and getting last value
        if (pullupUid.length - 1 <= index) {
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

    const newVal = maxPullUpUid.map((item, index) => {
      if (maxPullUpUid.length - 1 <= index) {
        let procMax = 0

        let max = parseInt(item.userInfo[0]['User_pullUp_Max'])
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
  const location = useLocation()
  React.useEffect(() => {
    PullUpalgo()
  }, [pullupData, user, pullupStats, location])

  const [totalPullUps, setTotalPullUps] = React.useState(null)

  let workoutmax = 0
  pullupUid.map((val) => {
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

  const totalPullUpCompiler = async () => {
    try {
      setTimeout(() => {
        let pushupStatReducer = pullupStats?.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        )
        setTotalPullUps(pushupStatReducer)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    totalPullUpCompiler()
  }, [pullupStats])

  let testedMaxPullUp = maxPullUpUid

    .filter((val, index) => {
      if (maxPullUpUid.length - 1 <= index) {
        return val
      }
    })
    .map((val) => {
      return val.userPullupMax
    })

  return (
    <PullUpContext.Provider
      value={{
        handleSubmit,
        register,
        getValues,
        handlePullUpSubmit,
        pullupData,
        pullupUid,
        pullupStats,
        timestamp,
        maxPullUpUid,
        sug1,
        sug2,
        sug3,
        sug4,
        sug5,
        totalPullUps,
        workoutmax,
        testedMaxPullUp,
        popup,
        setPopUp,
        pullupStatData,
      }}
    >
      {children}
    </PullUpContext.Provider>
  )
}

export const PullUpUseContext = () => {
  return useContext(PullUpContext)
}
