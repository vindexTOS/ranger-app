import React, { useState } from 'react'
import userPfp from '../utils/userinfo/user.png'
import camera from '../utils/userinfo/camera.png'
import { motion as m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { MainUseContext } from '../context/MainContext'
function AccountInfo({ handleSubmit, userDataSubmit }) {
  const {
    handleImageChange,
    sureLoading,
    uploadImg,
    setUserName,
    skipFunction,
    htlmImg,
    setSureLoading,
    userName,
    photoEdit,
    setPhotoEdit,
    handleUpdateDoc,
  } = MainUseContext()
  const navigate = useNavigate()
  const style = {
    mainDiv: `flex flex-row items-center justify-center  ${
      photoEdit ? 'bg-none' : 'bg-opacity-60 bg-gray-300 w-[100%]   h-[100vh]'
    }   `,
    section: `w-[400px] h-[340px] rounded-[17px] bg-white  btnshaddow`,
    cancelDiv: `w-[100%] h-[50px] border-b-2 flex flex-row items-center justify-between p-2`,
    form: `flex flex-col items-center p-5`,

    img: `w-[110px] h-[110px] hover:border-2  hover:border-blue-500 rounded-[50%]  cursor-pointer`,

    hoverCamera: ` p-5  w-[100px] h-[100px] absolute mt-[0.5rem] ml-1 cursor-pointer`,
    inputDiv: `flex flex-col     gap-2 justify-center w-[100%]  h-[100px]   `,
    input: `border-2 rounded-[14px] w-[90%] h-[2rem]`,
    save: `w-[100%] h-[40px] bg-blue-400 hover:bg-blue-500  cursor-pointer rounded-b-[14px] text-white text-[1.2rem] flex items-center justify-center text-center  `,
  }

  return (
    <div className={style.mainDiv}>
      {' '}
      <section className={style.section}>
        <div className={style.cancelDiv}>
          {!setPhotoEdit ? (
            <p className="cursor-pointer" onClick={() => skipFunction()}>
              Cancel
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => setPhotoEdit(!photoEdit)}
            >
              Cancel
            </p>
          )}
        </div>
        <div className={style.form}>
          <div>
            <label htmlFor="avatar">
              <m.img
                style={{ opacity: 0 }}
                whileHover={{
                  opacity: 1,
                }}
                className={style.hoverCamera}
                src={camera}
              />{' '}
              <m.img
                style={{
                  border: `1px solid gray`,
                }}
                whileHover={{
                  border: '2px solid blue',
                }}
                className={style.img}
                src={!htlmImg ? userPfp : htlmImg}
              />
            </label>
            <input
              id="avatar"
              className="hidden"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <div className={style.inputDiv}>
            <label className=" text-[14px] text-gray-400 pl-2 ">
              What should we call you ?
            </label>

            <input
              className={style.input}
              placeholder="  User Name"
              maxLength="12"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <h1 onClick={() => console.log(userName)}>CLICK</h1>
        </div>

        <div
          onClick={() => {
            uploadImg()
            navigate('/test')
          }}
          className={style.save}
        >
          <h1>Save</h1>
        </div>
      </section>
    </div>
  )
}

export default AccountInfo
