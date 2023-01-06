import React from 'react'
import { Link } from 'react-router-dom'

function Sidenavigation(props) {
  const style = {
    section: ` w-[70%] flex flex-col gap-[2.5rem] max_Xll:hidden  mb-[2.6rem]`,
    nav: `w-[93%] flex  h-[700px]   ml-[1rem]  div-bg rounded-[12px] btnshaddow `,
  }
  return (
    <section className={style.section}>
      <nav className={style.nav}>
        <Link to="/stats">Statistics</Link>
      </nav>
    </section>
  )
}

export default Sidenavigation
