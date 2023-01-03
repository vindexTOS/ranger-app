import React from 'react'
import Stats from './Stats'

function Sidenavigation(props) {
  const style = {
    section: ` flex flex-col gap-[2.5rem] mb-[2.6rem]`,
    nav: `w-[400px] flex  h-[500px]   ml-[2rem] bg-white rounded-[12px] btnshaddow `,
  }
  return (
    <section className={style.section}>
      <Stats />
      <nav className={style.nav}></nav>
    </section>
  )
}

export default Sidenavigation
