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
function Sidenavigation(props) {
  const { state, dispatch } = MainUseContext()

  const style = {
    section: ` w-[400px] h-[700px] flex flex-col gap-[2.5rem] max_Xll:hidden  mb-[3.5rem] `,
    nav: ` w-[400px] flex   justify-center     h-[700px]   ml-[1rem]  rounded-l-[14px] rounded-r-[8px] border-l-2  border-t-2 `,
    navWrapper: `mt-10 navbar flex flex-col gap-[8px]  text-[1.2rem] items-center`,
    link: `w-[16rem] h-[3.3rem] flex items-center gap-4 text-gray-500 border-r-2 border-b-2 rounded-[8px]`,
    imgicon: `w-[15%] ml-2`,
  }

  const navbuttonstyling = (state) => {
    const linkbg =
      'linear-gradient(276deg, rgba(132,216,255,0.35647762522977944) 41%, rgba(132,216,255,0.37888658881521353) 91%)'
    return {
      background: `${state ? linkbg : 'none'}`,
      color: `${state ? '#1cb0f6' : 'grey'}`,
      outline: `${state ? '1px solid #1cb0f6' : 'none'}`,
    }
  }

  const LinkDiv = (type, state, link, fun, img, title) => {
    return (
      <Link
        onClick={() => dispatch({ type: type })}
        className={style.link}
        style={fun(state)}
        to={link}
      >
        <img src={img} className={style.imgicon} />
        {title}
      </Link>
    )
  }
  return (
    <section className={style.section}>
      <nav className={style.nav}>
        <div className={style.navWrapper}>
          {' '}
          {LinkDiv(
            'pushup',
            state.pushup,
            'pushups',
            navbuttonstyling,
            pushupicon,
            'Push Ups',
          )}
          {LinkDiv(
            'pullup',
            state.pullup,
            'pullups',
            navbuttonstyling,
            pullupicon,
            'Pull Ups',
          )}
          {LinkDiv(
            'squat',
            state.squat,
            'squats',
            navbuttonstyling,
            squaticon,
            'Squats',
          )}
          {LinkDiv(
            'running',
            state.running,
            'running',
            navbuttonstyling,
            runicon,
            'Running',
          )}
          {LinkDiv(
            'statistics',
            state.statistics,
            'stats/pushup-stats',
            navbuttonstyling,
            statsicon,
            'Statistics',
          )}
          {LinkDiv(
            'history',
            state.history,
            'history',
            navbuttonstyling,
            calendaricon,
            'History',
          )}
          {LinkDiv(
            'achivments',
            state.achivments,
            'achievements',
            navbuttonstyling,
            awardicon,
            'Achievements',
          )}
        </div>
      </nav>
    </section>
  )
}

export default Sidenavigation
