import React from 'react'
import { MainUseContext } from '../../context/MainContext'
import { motion as m } from 'framer-motion'
import { AiOutlineUser, AiOutlineBars } from 'react-icons/ai'
import { IoMdLogOut } from 'react-icons/io'
import Buff from '../../utils/userinfo/buff.png'
import Award from './Award'
import AccountInfo from '../AccountInfo'
import Camera from '../../utils/userinfo/camera.png'
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
    updateUserInfo,
    sureLoading,
  } = MainUseContext()
  const style = {
    mainDiv: ` z-30 w-[400px] h-[400px] mt-[3.8rem] gap-2 z-20 right-1 flex flex-col bg-white btnshaddow border-l-2  border-b-2 border-gray-400 rounded-b-[17px] absolute items-center justify-center   `,
    button: `${
      user == null
        ? 'hidden'
        : 'btnshaddow flex w-[19rem] bg-[#ffd31d] text-white  items-center justify-center rounded-[8px] text-center'
    }`,
    header: `${
      user == null
        ? 'hidden'
        : 'btnshaddow w-[190px] h-[30px] bg-white rounded-[8px] flex  items-center  gap-5'
    } `,
    profileWrapper: ` `,
    profileDiv: `flex flex-row items-center justify-center gap-2 border-2  w-[19rem] rounded-[12px] pl-3 pr-3`,
    p: `text-[0.8rem]`,
    userIcon: `w-[80px] h-[80px] rounded-[50%] border-2 border-orange-500 cursor-pointer `,
    cameraWrapper: `w-[80px] h-[80px] flex items-center justify-center absolute hover:bg-blue-300 rounded-[50%] hover:bg-opacity-30 cursor-pointer`,

    iconWrapper: `flex items-center justify-center  cursor-pointer`,
    awardWrapper: `flex flex-col items-center justify-center border-2 rounded-[14px] `,
    editProfile: `flex flex-col items-center justify-center gap-1`,
    editHeader: `bg-blue-300 rounded-[10px] text-center w-[9rem] text-white hover:bg-blue-400 cursor-pointer btnshaddow`,
    max: `flex items-center justify-betwneen    w-[19rem] p-2  `,
  }
  const [test, setTest] = React.useState('')
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
              onClick={() => setPhotoEdit(!photoEdit)}
            >
              Edit Profile
            </h1>

            <h1 className={style.header}>
              <AiOutlineUser className="ml-2 text-green-400" />
              {photoEdit ? (
                <input
                  className="w-[120px]"
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
                className={`${sureLoading && 'hidden'}`}
                onClick={uploadImg}
              >
                Update
              </button>
            ) : null}
            {sureLoading && <button onClick={updateUserInfo}>Save</button>}
          </div>
        </div>
      </div>
      <div className={style.awardWrapper}>
        <h1 className="w-[100%]  text-center  ">Badges</h1>
        <Award />
      </div>
      <div className={style.max}>
        <img
          className="w-[50px] h-[50px] bg-orange-400 p-1 rounded-[50%]"
          src={Buff}
        />
        <h1 className="border-2 border-l-0 w-[21rem] h-[2rem] text-center pr-2 rounded-r-[20px] border-orange-300 text-red-500 drop-shadow-md ">
          Test Your Max
        </h1>
      </div>
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
