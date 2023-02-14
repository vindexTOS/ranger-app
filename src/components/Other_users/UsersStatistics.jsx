import userAvatar from '../../utils/userinfo/user.png'
import React, { useEffect, useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
import UserAwards from './UserAwards'
function UsersStatistics(props) {
  const {
    user,
    displayPhoto,
    displayName,
    userProfiles,
    pushupStats,
  } = MainUseContext()
  // flex flex-col items-center  w-[100%] p-5  overflow-y-scroll scroll   gap-5
  const style = {
    mainDiv: `w-[100vw] relative  h-[700px]   rounded-[8px] border-2 flex flex-col mt-10 items-center justify-center max_sm:ml-2 `,
    subDiv: `flex flex-col items-center  w-[100%] p-5  overflow-y-scroll scroll   gap-5 `,
    mapDiv: `flex gap-5 items-center max_sm:flex-col max_sm:h-[15rem] justify-start border-2 p-2 w-[90%] h-[10rem] rounded-[30px] `,
    imgDiv: `  items-center justify-center  gap-2  w-[10rem]   `,
    img: `w-[5rem] h-[5rem] rounded-[50%]   border-2  `,
    userHeader: ` flex flex-row items-center justify-center gap-1  text-[1.2rem] text-gray-400 `,
    p: `font-serif text-gray-400 text-[10px]`,
    numSpan: `text-blue-400`,
  }

  return (
    <div className={style.mainDiv}>
      <h1 className="border-b-2 w-[100%] text-center h-[4rem]">User List</h1>
      <div className={style.subDiv}>
        {userProfiles?.map((users) => {
          const {
            id,
            pfp,
            uid,
            userMax,
            userPullupMax,
            userSquatMax,
            userName,
          } = users
          return (
            <div key={id + uid + userName} className={style.mapDiv}>
              <div className="flex items-center justify-center gap-3 w-[20rem] ">
                {' '}
                <div className={style.imgDiv}>
                  <img
                    className={`${style.img}${
                      user.uid == uid ? 'border-green-400' : 'border-red-500'
                    }`}
                    src={pfp ? pfp : userAvatar}
                  />{' '}
                  <h1 className={style.userHeader}>
                    {userName ? userName : 'unknown user'}{' '}
                    {user.uid == uid ? (
                      <div className="w-[10px] h-[10px] rounded-[50%] bg-green-300"></div>
                    ) : (
                      <div className="w-[10px] h-[10px] rounded-[50%] bg-red-500"></div>
                    )}
                  </h1>
                </div>
                <div>
                  <p className={style.p}>
                    Squat Max{' '}
                    <span className={style.numSpan}>
                      {userSquatMax ? userSquatMax : 'No Data'}
                    </span>
                  </p>
                  <p className={style.p}>
                    Push Up Max{' '}
                    <span className={style.numSpan}>
                      {userMax ? userMax : 'No Data'}
                    </span>
                  </p>
                  <p className={style.p}>
                    Pull Up Max{' '}
                    <span className={style.numSpan}>
                      {' '}
                      {userPullupMax ? userPullupMax : 'No Data'}
                    </span>
                  </p>
                </div>
              </div>
              <UserAwards {...users} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersStatistics
