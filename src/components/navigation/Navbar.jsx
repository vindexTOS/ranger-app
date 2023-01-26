import React from 'react'

import { motion as m } from 'framer-motion'
import { MainUseContext } from '../../context/MainContext'
import { IoMdLogOut } from 'react-icons/io'
import { AiOutlineUser, AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Navbar() {
  const { user, displayPhoto, setDropDown, dropdown } = MainUseContext()
  const style = {
    nav: `${
      user == null ? 'hidden' : '   flex flex-row   w-[100%] h-[60px]  nav'
    }	`,
    navdiv: `flex flex-row   gap-5 items-center justify-end h-[100%] w-[95%]  `,

    p: `text-[0.8rem]`,
    userIcon: `w-[60px] h-[40px] rounded-[50%] border-2 border-orange-500`,
  }
  return (
    <nav className={style.nav}>
      <div className="flex flex-row gap-5 items-center 1xl:hidden">
        <AiOutlineBars
          onClick={() => setDropDown(!dropdown)}
          className="h-[2rem] text-[3rem] "
        />
      </div>

      <div className={style.navdiv}>
        <img
          className={style.userIcon}
          src={displayPhoto !== null ? displayPhoto.toString() : null}
        />
      </div>
    </nav>
  )
}

export default Navbar
