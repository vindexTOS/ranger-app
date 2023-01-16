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

const PullUpContext = createContext()

export const PullUpContextProvider = ({ children }) => {
  const { user, maxPushup, BMIconvertor, userInformationa } = MainUseContext() // pulling main context
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
      pullup.push(data)
      console.log(pullup)
      const { uid } = auth.currentUser
      await addDoc(collection(db, 'pullups'), {
        sets: pullup,
        time: Date(),

        timestamp: serverTimestamp(),
        uid,
      })
    }
  }
  /////pulling pull up data to firestore////////////////////////////////////////////////////////////////////////////

  const [pullupData, setPullUpdata] = React.useState([])

  useEffect(() => {
    console.log(pullup + '<<<<<<<<<<<<<<<<<<<<,')
    const q = query(collection(db, 'pullups'), orderBy('timestamp'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let pullup = []
      querySnapshot.forEach((doc) => {
        pullup.push({ ...doc.data(), id: doc.id })
      })

      let userUid = pullup
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

      if (lastUserUid == user.uid) {
        setPullUpdata(pullup)
      }
    })
    return () => unsub()
  }, [user])
  //// filtering pull up data based on user UID////////////////////////////////////////////////////////////////////////////

  let pullupUid = pullupData.filter((val) => {
    if (user !== null) {
      if (val.uid === user.uid) {
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

  /// algorithm for pull ups //////////////////////////////////////////////////////////////////////////////////////////////////////
  const [sug1, setSug1] = useState(0)
  const [sug2, setSug2] = useState(0)
  const [sug3, setSug3] = useState(0)
  const [sug4, setSug4] = useState(0)
  const [sug5, setSug5] = useState(0)

  const pushUpalgo = () => {
    //first set of the last workout user did from firebase IP
    const lastSetCounter = (set) => {
      let newVal = pullupUid.filter((item, index) => {
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
  }, [pullupData])
  return (
    <PullUpContext.Provider
      value={{
        handleSubmit,
        register,
        getValues,
        handlePullUpSubmit,
        pullupData,
        pullupUid,
        timestamp,
        maxPullUpUid,
        sug1,
        sug2,
        sug3,
        sug4,
        sug5,
      }}
    >
      {children}
    </PullUpContext.Provider>
  )
}

export const PullUpUseContext = () => {
  return useContext(PullUpContext)
}
