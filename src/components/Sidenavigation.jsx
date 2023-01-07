import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { MainUseContext } from '../context/MainContext'
function Sidenavigation(props) {
  const { reducer } = MainUseContext()

  const [state, dispatch] = useReducer(reducer, {
    pushup: true,
    pullup: false,
    squat: false,
    running: false,
    statistics: false,
    history: false,
    achivments: false,
  })

  const style = {
    section: ` w-[70%] flex flex-col gap-[2.5rem] max_Xll:hidden  mb-[2.6rem]`,
    nav: ` w-[93%] flex   justify-center     h-[700px]   ml-[1rem]  rounded-l-[14px] rounded-r-[8px] border-l-2  border-t-2 `,
    navWrapper: `mt-10 navbar flex flex-col gap-[8px]  text-[1.2rem] items-center`,
    link: `w-[12rem] h-[3.3rem] flex items-center  text-gray-500 border-r-2 border-b-2 rounded-[8px]`,
  }

  const linkbg =
    'linear-gradient(276deg, rgba(132,216,255,0.35647762522977944) 41%, rgba(132,216,255,0.37888658881521353) 91%)'
  return (
    <section className={style.section}>
      <nav className={style.nav}>
        <div className={style.navWrapper}>
          {' '}
          <Link
            onClick={() => dispatch({ type: 'pushup' })}
            className={style.link}
            style={{
              background: `${state.pushup ? linkbg : 'none'}`,
              color: `${state.pushup ? '#1cb0f6' : 'grey'}`,
              outline: `${state.pushup ? '1px solid #1cb0f6' : 'none'}`,
            }}
            to="pushups"
          >
            Push ups
          </Link>
          <Link
            onClick={() => dispatch({ type: 'pullup' })}
            style={{
              background: `${state.pullup ? linkbg : 'none'}`,
              color: `${state.pullup ? '#1cb0f6' : 'grey'}`,
              outline: `${state.pullup ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="pullups"
          >
            Pull ups
          </Link>
          <Link
            onClick={() => dispatch({ type: 'squat' })}
            style={{
              background: `${state.squat ? linkbg : 'none'}`,
              color: `${state.squat ? '#1cb0f6' : 'grey'}`,
              outline: `${state.squat ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="squats"
          >
            Squats
          </Link>
          <Link
            onClick={() => dispatch({ type: 'running' })}
            style={{
              background: `${state.running ? linkbg : 'none'}`,
              color: `${state.running ? '#1cb0f6' : 'grey'}`,
              outline: `${state.running ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="running"
          >
            Running
          </Link>
          <Link
            onClick={() => dispatch({ type: 'statistics' })}
            style={{
              background: `${state.statistics ? linkbg : 'none'}`,
              color: `${state.statistics ? '#1cb0f6' : 'grey'}`,
              outline: `${state.statistics ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="stats"
          >
            Statistics
          </Link>
          <Link
            onClick={() => dispatch({ type: 'history' })}
            style={{
              background: `${state.history ? linkbg : 'none'}`,
              color: `${state.history ? '#1cb0f6' : 'grey'}`,
              outline: `${state.history ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="history"
          >
            {' '}
            History
          </Link>
          <Link
            onClick={() => dispatch({ type: 'achivments' })}
            style={{
              background: `${state.achivments ? linkbg : 'none'}`,
              color: `${state.achivments ? '#1cb0f6' : 'grey'}`,
              outline: `${state.achivments ? '1px solid #1cb0f6' : 'none'}`,
            }}
            className={style.link}
            to="achivments"
          >
            Achivments
          </Link>
        </div>
      </nav>
    </section>
  )
}

export default Sidenavigation
