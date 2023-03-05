import React, { useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
import { PullUpUseContext } from '../../context/PullUpContext'
import { SquatUseContext } from '../../context/SquatContext'
import { NavUseContext } from '../../context/NavBarContext'

import { AwardIcons } from '../pages/Achivments.page/AwardUtils'

const UserAwards = ({ uid, id, userMax, userPullupMax, userSquatMax }) => {
  const { pushupData } = MainUseContext()
  const { pullupData } = PullUpUseContext()
  const { squatData } = SquatUseContext()
  const { firstStepsAward, commitedAward } = NavUseContext()
  let pushup = pushupData.filter((val) => {
    if (val.uid === uid) {
      return val
    }
  })

  let pullup = pullupData.filter((val) => {
    if (val.uid === uid) {
      return val
    }
  })

  let squat = squatData.filter((val) => {
    if (val.uid === uid) {
      return val
    }
  })

  const [pushupStats, setpushupStats] = useState(null)
  const statsFunction = () => {
    let newMap = pushup.map((val) => {
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
  const [totalPushups, setTotalpushups] = React.useState(null)
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

  const [squatStats, setSquatStats] = useState(null)

  React.useEffect(() => {
    const statsFunction = () => {
      let newMap = squat.map((val) => {
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
      setSquatStats(newMap)
    }
    statsFunction()
  }, [squatData])
  const [totalSquats, setTotalSquats] = React.useState(null)

  const totalSquatCompiler = async () => {
    try {
      setTimeout(() => {
        let SquatStatReducer = squatStats?.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        )
        setTotalSquats(SquatStatReducer)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    totalSquatCompiler()
  }, [squatStats])
  const [pullupStats, setPullUpStats] = useState(null)

  React.useEffect(() => {
    const statsFunction = () => {
      let newMap = pullup.map((val) => {
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
    statsFunction()
  }, [pullupData])

  const [totalPullUps, setTotalPullUps] = React.useState(null)

  const totalPullUpCompiler = async () => {
    try {
      let pushupStatReducer = pullupStats?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )
      setTotalPullUps(pushupStatReducer)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    totalPullUpCompiler()
  }, [pullupStats])

  const style = {
    mainDiv: `w-[70%] h-[100px] flex  max_sm:w-[90%] items-center justify-end award-setting-grid-wrapper  `,
    img: `w-[30px] h-[30px] bg-red-400 rounded-[12px]`,
  }
  let totalSession = pushup.length + pullup.length + squat.length
  let totalRepsOfAll = totalSquats + totalPullUps + totalPushups
  const awardImg = (Award, lockAward, num, bool, color) => {
    return (
      <img
        className={`w-[40px] h-[40px] ${color} rounded-[12px]`}
        src={bool >= num ? AwardIcons[Award] : AwardIcons[lockAward]}
      />
    )
  }
  return (
    <div className={style.mainDiv}>
      {awardImg(
        'firstSteps',
        'firstStepsBefore',
        1,
        firstStepsAward,
        'bg-green-300',
      )}
      {awardImg('commited', 'commitedLock', 3, commitedAward, 'bg-red-400')}
      {awardImg('gravity', 'gravityLock', 150, totalPushups, 'bg-blue-400')}
      {awardImg(
        'hangInThere',
        'hangInThereLock',
        100,
        totalPullUps,
        'bg-orange-400',
      )}
      {awardImg('atlas', 'atlasLock', 200, totalSquats, 'bg-blue-400')}
      {awardImg(
        'spartan',
        'spartanLock',
        1000,
        totalRepsOfAll,
        'bg-purple-500',
      )}
      {awardImg('dicip', 'dicipLock', 30, totalSession, 'bg-blue-300')}
      {awardImg(
        'pushUpMuscleLvl3',
        'pushUpMuscleLock',
        1000,
        totalPushups,
        'bg-green-400',
      )}
      {awardImg(
        'Monkking',
        'MonkKingLock',
        1000,
        totalPullUps,
        'bg-orange-300',
      )}
      {awardImg('Milobull', 'MilobullLock', 1000, totalSquats, 'bg-red-300')}
    </div>
  )
}

export default UserAwards
