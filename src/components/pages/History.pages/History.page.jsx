import React from 'react'
import PushUpHistory from './PushUpHistory'
import PullUpHistory from './PullUpHistory'
import SquatHistory from './SquatHistory'
function HistoryPage(props) {
  const style = {
    mainDiv: `w-[100vw] h-[500px] mt-[16rem] flex flex-col items-center gap-[4rem] justify-center `,
  }

  return (
    <div className={style.mainDiv}>
      <PushUpHistory />

      <PullUpHistory />

      <SquatHistory />
    </div>
  )
}

export default HistoryPage
