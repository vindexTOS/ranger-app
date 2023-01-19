import React from 'react'
import { useLocation } from 'react-router-dom'

import { NavLinks, style } from './styles'

function StatNav() {
  let location = useLocation()

  const locations = {
    pushup: location.pathname == '/workroom/stats/pushup-stats',
    pullup: location.pathname == '/workroom/stats/pullup-stats',
    squat: location.pathname == '/workroom/stats/squat-stats',
  }
  return (
    <nav className={style.nav}>
      {NavLinks('Push up stats', 'pushup-stats', locations.pushup)}
      {NavLinks('Pull up stats', 'pullup-stats', locations.pullup)}
      {NavLinks('Squat stats', 'squat-stats', locations.squat)}
    </nav>
  )
}

export default StatNav
