<<<<<<< HEAD
import React, { useState } from 'react'
import userPfp from '../utils/userinfo/user.png'
import camera from '../utils/userinfo/camera.png'
import { motion as m } from 'framer-motion'

import { MainUseContext } from '../context/MainContext'
function AccountInfo() {
  const {
    handleImageChange,
    sureLoading,
    uploadImg,
    setUserName,
    skipFunction,
    htlmImg,
    setSureLoading,
    handlePfpSubmit,
  } = MainUseContext()
=======
import React from 'react'
import userPfp from '../utils/userinfo/user.png'
import { MainUseContext } from '../context/MainContext'

function AccountInfo() {
  const { setUserImg, userImg, uploadImage, userImgUrl } = MainUseContext()
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159

  const style = {
    mainDiv: `flex flex-row items-center justify-center w-[100%] bg-opacity-60 bg-gray-300 h-[100vh]  `,
    section: `w-[400px] h-[340px] rounded-[17px] bg-white  btnshaddow`,
    cancelDiv: `w-[100%] h-[50px] border-b-2 flex flex-row items-center justify-between p-2`,
    form: `flex flex-col items-center  p-5`,
<<<<<<< HEAD
    img: `   w-[110px] h-[110px] hover:border-2  hover:border-blue-500 rounded-[50%]  cursor-pointer`,

    hoverCamera: ` p-5  w-[100px] h-[100px] absolute mt-[0.5rem] ml-1 cursor-pointer`,
    inputDiv: `flex flex-col     gap-2 justify-center w-[100%]  h-[100px]   `,
    input: `border-2 rounded-[14px] w-[90%] h-[2rem]`,
    save: `w-[100%] h-[40px] bg-blue-400 hover:bg-blue-500  cursor-pointer rounded-b-[14px] text-white text-[1.2rem] flex items-center justify-center text-center  `,
  }

=======
    img: `w-[110px] h-[110px] hover:border-2  hover:border-blue-500 hover:rounded-[50%] cursor-pointer`,
    inputDiv: `flex flex-col     gap-2 justify-center w-[100%]  h-[100px]   `,
    input: `border-2 rounded-[14px] w-[90%] h-[2rem]`,
    skip: `w-[100%] h-[40px] bg-blue-400 hover:bg-blue-500  cursor-pointer rounded-b-[14px] text-white text-[1.2rem] flex items-center justify-center text-center  `,
  }
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159
  return (
    <div className={style.mainDiv}>
      {' '}
      <section className={style.section}>
        <div className={style.cancelDiv}>
<<<<<<< HEAD
          <p onClick={() => skipFunction()}>Cancel</p>
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
=======
          <p>Cancel</p>
          <p>Save</p>
        </div>
        <div className={style.form}>
          <img className={style.img} src={userImgUrl} />
          <button onClick={uploadImage}>Upload Avatar</button>
          <button onClick={() => console.log(userImgUrl)}>LOG</button>
          <input
            type="file"
            onChange={(e) => {
              setUserImg(e.target.files[0])
            }}
          />
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159

          <div className={style.inputDiv}>
            <label className=" text-[14px] text-gray-400 pl-2 ">
              What should we call you ?
            </label>

<<<<<<< HEAD
            <input
              className={style.input}
              placeholder="  User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        {!sureLoading ? (
          <div onClick={uploadImg} className={style.save}>
            <h1>Save</h1>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center  w-[100%] h-[100px]  bg-blue-400 rounded-b-[14px] text-white">
            <h6 className="text-[1.6rem]">Are You Sure ?</h6>
            <div className="flex flex-row items-center justify-between gap-10 h-[100%]  w-[100%] pr-5 pl-5 pt-5">
              <h1
                className="w-[50%] h-[2rem]  text-[1.2rem] text-center bg-red-400 hover:bg-red-500 z-20 rounded-[14px] cursor-pointer  border-2"
                onClick={() => setSureLoading(!sureLoading)}
              >
                Go Back.
              </h1>
              <h1
                onClick={handlePfpSubmit}
                className="w-[50%] h-[2rem]  text-[1.2rem] text-center bg-green-400 hover:bg-green-500 z-20 rounded-[14px]  border-2 cursor-pointer"
              >
                Continue
              </h1>
            </div>
          </div>
        )}
=======
            <input className={style.input} placeholder="  User Name" />
          </div>
        </div>

        <div className={style.skip}>
          <h1>Skip</h1>
        </div>
>>>>>>> 3abe345c8a141c9a80aceb91067bb62a3e589159
      </section>
    </div>
  )
}

export default AccountInfo
