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
    section: ` w-[70%] flex flex-col gap-[2.5rem] max_Xll:hidden  mb-[2.6rem]`,
    nav: ` w-[93%] flex   justify-center     h-[700px]   ml-[1rem]  rounded-l-[14px] rounded-r-[8px] border-l-2  border-t-2 `,
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

  return (
    <section className={style.section}>
      <nav className={style.nav}>
        <div className={style.navWrapper}>
          {' '}
          <Link
            onClick={() => dispatch({ type: 'pushup' })}
            className={style.link}
            style={navbuttonstyling(state.pushup)}
            to="pushups"
          >
            <img src={pushupicon} className={style.imgicon} />
            Push ups
          </Link>
          <Link
            onClick={() => dispatch({ type: 'pullup' })}
            style={navbuttonstyling(state.pullup)}
            className={style.link}
            to="pullups"
          >
            <img src={pullupicon} className={style.imgicon} /> Pull ups
          </Link>
          <Link
            onClick={() => dispatch({ type: 'squat' })}
            style={navbuttonstyling(state.squat)}
            className={style.link}
            to="squats"
          >
            <img src={squaticon} className={style.imgicon} />
            Squats
          </Link>
          <Link
            onClick={() => dispatch({ type: 'running' })}
            style={navbuttonstyling(state.running)}
            className={style.link}
            to="running"
          >
            <img src={runicon} className={style.imgicon} />
            Running
          </Link>
          <Link
            onClick={() => dispatch({ type: 'statistics' })}
            style={navbuttonstyling(state.statistics)}
            className={style.link}
            to="stats"
          >
            <img src={statsicon} className={style.imgicon} /> Statistics
          </Link>
          <Link
            onClick={() => dispatch({ type: 'history' })}
            style={navbuttonstyling(state.history)}
            className={style.link}
            to="history"
          >
            {' '}
            <img src={calendaricon} className={style.imgicon} /> History
          </Link>
          <Link
            onClick={() => dispatch({ type: 'achivments' })}
            style={navbuttonstyling(state.achivments)}
            className={style.link}
            to="achievements"
          >
            <img src={awardicon} className={style.imgicon} />
            Achievements
          </Link>
        </div>
      </nav>
    </section>
  )
}

export default Sidenavigation
