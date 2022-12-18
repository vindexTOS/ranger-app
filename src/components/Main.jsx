import React from 'react'
import { MainUseContext } from '../context/MainContext'
import { useNavigate } from 'react-router'
import Workoutroom from './Workoutroom'
function Main() {
  const { user, logOut, handleLogOut } = MainUseContext()

  /*React.useEffect(() => {
    const getEqupment = async () => {
      try {
        const userData = await getDocs(watchlistData)
        console.log(userData)
        userData.docs.map((doc) => {
          const newDoc =
            doc._document.data.value.mapValue.fields.name.stringValue

          if (doc.id == user.uid) {
            setData(newDoc)
          }
        })
      } catch (err) {
        console.log(err.message)
      }
    }
    return () => getEqupment()
  }, [])*/

  // doc update///
  const style = {
    workDiv: ` flex flex-col gap-6 items-center justify-center w-[100vw] h-[100vh]`,
  }
  return (
    <div>
      <h1>Email:{user.email}</h1>
      <button onClick={handleLogOut}>log out</button>
      <div className={style.workDiv}>
        <Workoutroom />
      </div>
    </div>
  )
}

export default Main
