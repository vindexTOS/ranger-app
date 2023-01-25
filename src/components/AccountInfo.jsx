import React from 'react'
import userPfp from '../utils/userinfo/user.png'
import { MainUseContext } from '../context/MainContext'

function AccountInfo() {
  const { setUserImg, userImg, uploadImage, userImgUrl } = MainUseContext()

  const style = {
    mainDiv: `flex flex-row items-center justify-center w-[100%] bg-opacity-60 bg-gray-300 h-[100vh]  `,
    section: `w-[400px] h-[340px] rounded-[17px] bg-white  btnshaddow`,
    cancelDiv: `w-[100%] h-[50px] border-b-2 flex flex-row items-center justify-between p-2`,
    form: `flex flex-col items-center  p-5`,
    img: `w-[110px] h-[110px] hover:border-2  hover:border-blue-500 hover:rounded-[50%] cursor-pointer`,
    inputDiv: `flex flex-col     gap-2 justify-center w-[100%]  h-[100px]   `,
    input: `border-2 rounded-[14px] w-[90%] h-[2rem]`,
    skip: `w-[100%] h-[40px] bg-blue-400 hover:bg-blue-500  cursor-pointer rounded-b-[14px] text-white text-[1.2rem] flex items-center justify-center text-center  `,
  }
  return (
    <div className={style.mainDiv}>
      {' '}
      <section className={style.section}>
        <div className={style.cancelDiv}>
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

          <div className={style.inputDiv}>
            <label className=" text-[14px] text-gray-400 pl-2 ">
              What should we call you ?
            </label>

            <input className={style.input} placeholder="  User Name" />
          </div>
        </div>

        <div className={style.skip}>
          <h1>Skip</h1>
        </div>
      </section>
    </div>
  )
}

export default AccountInfo
