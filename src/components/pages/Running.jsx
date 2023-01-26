import React from 'react'
import inprogress from '../../utils/png/work-in-progress.png'

function Running(props) {
  const style = {
    mainDiv: `w-[100vw] flex items-center justify-center`,
  }
  return (
    <div className={style.mainDiv}>
      {' '}
      <img className="w-[200px]" src={inprogress} />
    </div>
  )
}

export default Running
