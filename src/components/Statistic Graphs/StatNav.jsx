import React from 'react'
import { Link } from 'react-router-dom'

function StatNav() {
  const style = {
    nav: `flex flex-col items-center justify-center gap-5 rounded-[14px]  mb-20 border-r-2 border-t-2 w-[450px] h-[600px] max_md:hidden `,
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
