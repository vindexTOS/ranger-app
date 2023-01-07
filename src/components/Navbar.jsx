import React from 'react'

import { motion as m } from 'framer-motion'
import { MainUseContext } from '../context/MainContext'
import { IoMdLogOut } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Navbar() {
  const { user, handleLogOut } = MainUseContext()
  const style = {
    nav: `${
      user == null ? 'hidden' : 'z-20 flex flex-col w-[100%] h-[60px]  nav'
    }	`,
    navdiv: `flex flex-row mt-3 gap-5 items-center justify-end w-[95%]`,
    button: `${
      user == null
        ? 'hidden'
        : 'btnshaddow flex w-[70px] bg-[#ffd31d] items-center justify-center rounded-[8px] text-center'
    }`,
    header: `${
      user == null
        ? 'hidden'
        : 'btnshaddow w-[190px] h-[30px] bg-white rounded-[8px] flex  items-center  gap-5'
    } `,
    p: `text-[0.8rem]`,
  }
  return (
    <nav className={style.nav}>
      <div className={style.navdiv}>
        <m.h1 initial={{ y: -300 }} animate={{ y: 0 }} className={style.header}>
          <AiOutlineUser className="ml-2 text-green-400" />
          <p className={style.p}>{user !== null ? user.email : 'User'}</p>
        </m.h1>
        <m.button
          className={style.button}
          onClick={handleLogOut}
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          whileHover={{
            background:
              'linear-gradient(90deg, rgba(255,116,29,1) 0%, rgba(255,97,12,0.9693627450980392) 84%)',
            color: '#1dfffd',
          }}
        >
          <IoMdLogOut /> <span className="mb-[2px]">log out</span>
        </m.button>
      </div>
      <div>
        <Link to="/workroom/pushups">Main</Link>
      </div>
    </nav>
  )
}

export default Navbar
