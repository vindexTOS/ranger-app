import { async } from '@firebase/util'
import { query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
function UsersStatistics(props) {
  const { user, displayPhoto, displayName } = MainUseContext()
  const [userUniqUid, setUserUniqUid] = useState(null)

  /*useEffect(() => {
    setTimeout(() => {
      let arr = []

      userProfiles.filter((item) => {
        arr.push(item.uid)
      })

      let uniq = [...new Set(arr)]
      setUserUniqUid(uniq)
    }, 2000)
  }, [userProfiles])*/

  return (
    <div>
      <button>LOG CONSOLE</button>
    </div>
  )
}

export default UsersStatistics
