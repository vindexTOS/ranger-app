import React, { useState } from 'react'
import Settings from '../user_settings/Settings'
import { motion as m } from 'framer-motion'
import { MainUseContext } from '../../context/MainContext'
import { AiOutlineUser, AiOutlineBars } from 'react-icons/ai'

function Navbar() {
  const {
    user,
    displayPhoto,
    setDropDown,
    dropdown,
    displayName,
    dark,
    settingDrop,
    setSettingDrop,
  } = MainUseContext()

  const style = {
    nav: `${
      user == null
        ? 'hidden'
        : `flex flex-row    w-[100%] h-[60px]  ${
            dark ? 'nav' : 'bg-gray-800 border-gray-500'
          }`
    }	`,
    navdiv: `flex flex-row   gap-5 items-center justify-end h-[100%] w-[95%]  `,

    p: `text-[0.8rem]`,
    userIcon: `w-[52px] h-[52px] rounded-[50%] border-2 border-orange-500 cursor-pointer `,
    userName: ` flex items-center justify-center gap-2  text-gray-500 text-[15px] w-[7rem] font-extralight border-2 rounded-[14px] text-center border-bg-black `,
  }
  return (
    <nav className={style.nav}>
      <div className="flex flex-row gap-5 items-center 1xl:hidden">
        <AiOutlineBars
          onClick={() => setDropDown(!dropdown)}
          className={`h-[2rem] text-[3rem] ${
            dark ? 'text-black' : 'text-white'
          }`}
        />
      </div>

      <div className={style.navdiv}>
        <h1 className={style.userName}>
          <AiOutlineUser
            className={`${user ? 'text-green-400' : 'text-red-600'}`}
          />
          {displayName !== null ? displayName.toString() : null}
        </h1>
        <img
          onClick={() => setSettingDrop(!settingDrop)}
          className={style.userIcon}
          src={displayPhoto !== null ? displayPhoto.toString() : null}
        />
      </div>
      {settingDrop && <Settings />}
    </nav>
  )
}

export default Navbar
