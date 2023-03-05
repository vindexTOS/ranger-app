import React from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import { GiChargedArrow } from 'react-icons/gi'
function ProgressAwardBar({ props }) {
  return (
    <div className="border-2 w-[100%] rounded-[15px] border-grey-800">
      <ProgressBar
        className="border-2 rounded-[15px] border-white"
        completed={props.data | 0}
        height="30px"
        width="100%"
        bgColor="#fdc378"
        borderRadius="20px"
        baseBgColor="#a4fff9"
        labelColor="#ffffff"
        maxCompleted={props.maxCompleted}
        customLabel={props.label}
      />
    </div>
  )
}

export default ProgressAwardBar
