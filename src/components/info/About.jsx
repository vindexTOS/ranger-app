import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  const style = {
    section: `w-[100vw] h-[100vh] flex flex-col items-center justify-center about-section gap-2`,
    mainDiv: `w-[50%] h-[500px] rounded-[8px] flex flex-col gap-4 items-center justify-center p-10  about-div max_sm:mt-5 max_sm:h-[80%] max_sm:w-[90%] max_lg:w-[60%] max_lg:h-[80%]`,
    p: `text-center max_xl:text-[14px] max_lg:text-[12px]   max_sm:text-[14px]`,
    header: `text-center text-[1.5rem] max_xl:text-[1rem] max_lg:text-[14px] font-bold`,
    outline: `  w-[200px] bg-green-600 p-[0.6px] max_xl:w-[100px] max_lg:w-[50px] `,
    logDiv: `flex  items-center justify-center gap-10 w-[50%] bg-white rounded-[12px] logdiv`,
  }

  return (
    <section className={style.section}>
      <div className={style.mainDiv}>
        <h1 className={style.header}>
          {' '}
          This course will help you to get ready for ranger assessment and
          selection to meet the minimum fitness requirements.... or if you just
          want to get in shape for new years resolution
        </h1>
        <span className={style.outline}></span>

        <p className={style.p}>
          To pass the Ranger physical fitness test you are judged in the 17 to
          21 age bracket, regardless of your age. You must complete a five-mile
          run in 40 minutes, and do 49 pushups, six chinups and 59 situps
        </p>
        <span className={style.outline}></span>

        <p className={style.p}>
          At registration form we will ask you few basic questions to write
          specific program based on your body type and life style,at the end of
          the form we will test your maximum repetition for each exercise and
          write you next program based on your input,exersises will include
          basic push ups,sit ups,pull ups and running
        </p>
        <span className={style.outline}></span>

        <p className={style.p}>
          We recommend you to workout 3 times a week and take days off..if you
          are already strong in one givin exersise or you just don't care about
          it you can just skip them and focuse on ones that you are intrested in
        </p>
      </div>
      <div className={style.logDiv}>
        {' '}
        <Link className="text-green-600" to="/">
          Sign In
        </Link>
        <Link className="text-orange-600" to="/signup">
          Sign Up
        </Link>
      </div>
    </section>
  )
}

export default About
