import React, { useState } from 'react'
import { MainUseContext } from '../../context/MainContext'
import { motion as m } from 'framer-motion'
import { AiOutlineUser, AiOutlineBars } from 'react-icons/ai'
import { IoMdLogOut } from 'react-icons/io'
import { FiMoon, FiSun } from 'react-icons/fi'
import Buff from '../../utils/userinfo/buff.png'
import Award from './Award'
import AccountInfo from '../AccountInfo'
import UserProfiles from '../../utils/userinfo/usersprofiles.png'
import Camera from '../../utils/userinfo/camera.png'
import { useNavigate } from 'react-router-dom'
function Settings() {
  const {
    setUserName,

    user,
    handleLogOut,
    displayPhoto,

    photoEdit,
    setPhotoEdit,
    uploadImg,
    handleImageChange,
    htlmImg,
    updateUserPhoto,
    updateUserName,
    sureLoading,
    dark,
    setDark,
  } = MainUseContext()
  const style = {
    mainDiv: `${
      dark ? 'bg-white border-gray-400' : 'bg-gray-700 border-gray-500'
    } z-50 w-[400px] h-[420px] mt-[3.8rem] gap-2 z-20 right-1 flex flex-col btnshaddow border-l-2  border-b-2  rounded-b-[17px] absolute items-center justify-center   `,
    button: `btnshaddow flex w-[19rem] items-center justify-center rounded-[8px] text-center ${
      dark
        ? '  bg-[#ffd31d]'
        : 'text-white bg-gray-700 border-gray-500 border-2'
    } `,
    header: ` btnshaddow w-[190px] h-[30px]  rounded-[8px] flex  items-center  gap-5 ${
      dark ? 'bg-white' : 'bg-orange-200'
    }`,
    profileWrapper: ` `,
    profileDiv: `flex flex-row items-center justify-center gap-2 border-2  w-[19rem] rounded-[12px] pl-3 pr-3 ${
      !dark && 'border-gray-500'
    } `,
    p: `text-[0.8rem] ${dark ? 'bg-white' : ' text-white'}`,
    userIcon: `w-[80px] h-[80px] rounded-[50%] border-2 border-gray-500 cursor-pointer `,
    cameraWrapper: `w-[80px] h-[80px] flex items-center justify-center absolute hover:bg-blue-300 rounded-[50%] hover:bg-opacity-30 cursor-pointer`,

    iconWrapper: `flex items-center justify-center  cursor-pointer`,
    awardWrapper: `flex flex-col items-center justify-center border-2  rounded-[14px]   ${
      !dark && 'border-gray-500'
    } `,
    editProfile: `flex flex-col items-center justify-center gap-1`,
    editHeader: ` rounded-[10px] text-center w-[9rem] text-white  cursor-pointer btnshaddow ${
      dark
        ? 'bg-blue-300 hover:bg-blue-400'
        : 'bg-orange-500 hover:bg-orange-400'
    }`,
    usersProfilesIcon: `w-[50px] h-[50px]   p-1 rounded-[50%] cursor-pointer z-10 absolute border-2    btnshaddow ${
      dark
        ? 'bg-purple-400 hover:bg-blue-300'
        : ' bg-gray-600 hover:bg-gray-500 border-gray-500'
    }  `,
    usersProfilesHeader: ` ${
      dark ? ' bg-purple-400 ' : ' bg-gray-600 border-gray-500'
    }  border-2 border-l-0 rounded-l-[20px]  text-shaddow w-[21rem] h-[2rem] text-center   rounded-r-[20px] btnshaddow  text-white   drop-shadow-md cursor-pointer `,
    max: `flex items-center justify-betwneen    w-[19rem] p-2  `,

    maxIcon: `w-[50px] h-[50px] p-1 rounded-[50%] cursor-pointer z-10 absolute border-2  btnshaddow ${
      dark
        ? ' bg-orange-400 hover:bg-orange-500 '
        : 'border-gray-500   bg-gray-600 hover:bg-gray-500 border-gray-500 '
    } `,
    maxHeader: ` border-2 border-l-0 rounded-l-[20px]  text-shaddow w-[21rem] h-[2rem] text-center   rounded-r-[20px] btnshaddow  text-white  drop-shadow-md cursor-pointer ${
      dark ? ' bg-orange-400  ' : 'bg-gray-600 border-gray-500'
    } `,
  }
  const navigate = useNavigate()
  const [nameEdit, setNameEdit] = useState(false)
  return (
    <div className={style.mainDiv}>
      {' '}
      <div className={style.profileWrapper}>
        {' '}
        <div className={style.profileDiv}>
          <label htmlFor="photo">
            {' '}
            <div
              className={style.iconWrapper}
              onClick={() => setPhotoEdit(!photoEdit)}
            >
              <div className={style.cameraWrapper}>
                <m.img
                  src={Camera}
                  style={{ width: '50px', height: '50px', opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                  }}
                />{' '}
                <input
                  className="hidden"
                  type="file"
                  id="photo"
                  onChange={handleImageChange}
                />
              </div>{' '}
              <img
                className={style.userIcon}
                src={htlmImg ? htlmImg : displayPhoto}
              />
            </div>{' '}
          </label>

          <div className={style.editProfile}>
            <h1
              className={style.editHeader}
              onClick={() => setNameEdit(!nameEdit)}
            >
              Edit Name
            </h1>
            <h1 className={style.header}>
              <AiOutlineUser className="ml-2 text-green-400" />
              {nameEdit ? (
                <input
                  className={`${!dark && 'bg-orange-200'} w-[120px] `}
                  placeholder="Change Name.."
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              ) : (
                <p className={style.p}>{user !== null ? user.email : 'User'}</p>
              )}
            </h1>
            {htlmImg || photoEdit ? (
              <button
                className={` text-white rounded-[8px] pr-1 pl-1 ${
                  dark ? 'bg-blue-300' : 'bg-orange-400'
                }`}
                onClick={uploadImg}
              >
                Update
              </button>
            ) : null}

            {sureLoading && (
              <button
                className="bg-blue-300 text-white rounded-[8px] pr-1 pl-1"
                onClick={updateUserPhoto}
              >
                Save
              </button>
            )}
            {nameEdit && (
              <button
                className={` text-white rounded-[8px] pr-1 pl-1 ${
                  dark ? 'bg-blue-300 ' : 'bg-orange-300 '
                }`}
                onClick={updateUserName}
              >
                Change name
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={style.awardWrapper}>
        <h1
          className={` w-[100%]  text-center ${
            !dark && 'border-b-2 border-gray-500 text-white'
          }`}
        >
          Badges
        </h1>
        <Award />
      </div>
      <div
        className={style.max}
        onClick={() => navigate('workroom/user-stats')}
      >
        <img className={style.usersProfilesIcon} src={UserProfiles} />
        <h1 className={style.usersProfilesHeader}>User Profiles</h1>
      </div>
      <div className={style.max} onClick={() => navigate('workroom/testroom')}>
        <img className={style.maxIcon} src={Buff} />
        <h1 className={style.maxHeader}>Test Your Max</h1>
      </div>
      {dark ? (
        <div
          className="text-gray-400 cursor-pointer hover:text-gray-500 flex items-center justify-center gap-2"
          onClick={() => setDark(!dark)}
        >
          {' '}
          <FiMoon className="text-[2rem] " /> Dark Mode
        </div>
      ) : (
        <div
          className="text-white cursor-pointer hover:text-gray-300 flex items-center justify-center gap-2"
          onClick={() => setDark(!dark)}
        >
          <FiSun className="text-[2rem] " /> Light Mode
        </div>
      )}
      <m.button
        className={style.button}
        onClick={handleLogOut}
        whileHover={{
          background:
            'linear-gradient(90deg, rgba(255,116,29,1) 0%, rgba(255,97,12,0.9693627450980392) 84%)',
          color: '#1dfffd',
        }}
      >
        <IoMdLogOut className="font-semibold" />
        <span className="mb-[2px] font-semibold">log out</span>
      </m.button>
    </div>
  )
}

export default Settings
