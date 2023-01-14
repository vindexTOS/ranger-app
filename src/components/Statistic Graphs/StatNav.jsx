import React from 'react'
import { Link } from 'react-router-dom'

function StatNav() {
  const style = {
    nav: `flex flex-row   items-center justify-center gap-5 rounded-[14px]  border-r-2 border-t-2 w-[450px] h-[100px] max_md:w-[300px] `,
  }

  const NavLinks = (title, link) => {
    return <Link to={link}>{title}</Link>
  }
  return (
    <nav className={style.nav}>
      {NavLinks('push ups')}
      {NavLinks('push ups')}
      {NavLinks('push ups')}
    </nav>
  )
}

export default StatNav
