import React from 'react'
import Stats from './Stats'
import { Link } from 'react-router-dom'

function Sidenavigation(props) {
  const style = {
    section: ` w-[70%] flex flex-col gap-[2.5rem] max_Xll:hidden  mb-[2.6rem]`,
    nav: `w-[93%] flex  h-[500px]   ml-[2rem] bg-white rounded-[12px] btnshaddow `,
  }
  return (
    <section className={style.section}>
      <Stats />
      <nav className={style.nav}>
        <Link to="/stats">Statistics</Link>
      </nav>
    </section>
  )
}

export default Sidenavigation
