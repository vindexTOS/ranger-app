import React from 'react'
import ProgressAwardBar from './ProgressBar'
function SingleAchievement({ props }) {
  const style = {
    mainDiv: `w-[98%] gap-10   flex flex-row items-center justify-center pr-10 pl-10 pb-2  h-[100px] border-2  rounded-[8px]  `,
    mainDivResp:
      'max_sm:w-[350px] max_sm:h-[390px] max_sm:items-start max_sm:justify-start max_sm:flex-col max_sm:p-2 max_sm:gap-5',
  }
  return (
    <div className={`${style.mainDiv} ${style.mainDivResp}`}>
      <img
        className="w-[5rem] h-[4rem] bg-red-500 mt-[1rem] rounded-[12px] max_sm:w-[90%] max_sm:h-[50%] max_sm:ml-4   "
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
      <h1 className="text-[10px] w-[9rem] text-center award-fonts max_sm:w-[15rem]   max_sm:mr-4">
        {props.goal}
      </h1>
    </div>
  )
}

export default SingleAchievement
