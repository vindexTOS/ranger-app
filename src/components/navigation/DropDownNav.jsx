import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { MainUseContext } from '../../context/MainContext'
import pushupicon from '../../utils/png/push-up-bar.png'
import pullupicon from '../../utils/png/pull-up-bar.png'
import squaticon from '../../utils/png/weightlifting.png'
import runicon from '../../utils/png/run.png'
import statsicon from '../../utils/png/statistics.png'
import calendaricon from '../../utils/png/timetable.png'

import awardicon from '../../utils/png/award.png'
function DropDownNav(props) {
  const { setDropDown, dropdown } = MainUseContext()

  const style = {
    section: ` w-[100%] h-[1000px] flex flex-col gap-[2.5rem] bg-gray-600 bg-opacity-75 absolute  z-30  1xl:hidden  mb-20  `,
    nav: ` w-[100%] flex   justify-start items-start    h-[100%]      `,
    navWrapper: `  navbar flex flex-col gap-1 text-[1.2rem] items-start`,
    link: `w-[100%] h-[4rem] flex items-center gap-4 bg-white  text-black `,
    imgicon: `w-[10%] ml-2`,
  }

  const navLinks = (title, linkTo, icon) => {
    return (
      <Link
        className={style.link}
        to={linkTo}
        onClick={() => setDropDown(!dropdown)}
      >
        <img src={icon} className={style.imgicon} />
        {title}
      </Link>
    )
  }

  return (
    <section className={style.section}>
      <nav className={style.nav}>
        <div className={style.navWrapper}>
          {navLinks('Push ups', 'pushups', pushupicon)}
          {navLinks('Pull ups', 'pullups', pullupicon)}
          {navLinks('Squats', 'squats', squaticon)}
          {navLinks('Running', 'running', runicon)}
          {navLinks(
            'Statistics',

            'stats/pushup-stats',
            statsicon,
          )}
          {navLinks('History', 'history', calendaricon)}
          {navLinks('Achievements', 'achievements', awardicon)}
        </div>
      </nav>
    </section>
  )
}

export default DropDownNav
