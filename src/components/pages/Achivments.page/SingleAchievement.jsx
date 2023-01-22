import React from 'react'
import ProgressAwardBar from './ProgressBar'
function SingleAchievement({ props }) {
  const style = {
    mainDiv: `w-[98%] gap-10 flex flex-row items-center justify-center pr-10 pl-10 pb-2  h-[100px] border-2  rounded-[8px]  `,
  }
  return (
    <div className={style.mainDiv}>
      <img
        className="w-[5rem] h-[4rem] bg-red-500 mt-[1rem] rounded-[12px]   "
        src={props.img}
      />

      <div className="w-[100%] flex flex-col gap-2">
        <p className="text-[14px] w-[14rem]   text-center award-fonts">
          {props.name}
        </p>

        <ProgressAwardBar
          props={{
            data: props.data,
            maxCompleted: props.maxCompleted,
            label: props.label,
          }}
        />
      </div>
      <h1 className="text-[10px] w-[9rem] text-center award-fonts">
        {props.goal}
      </h1>
    </div>
  )
}

export default SingleAchievement
