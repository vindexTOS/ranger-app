import React from 'react'
import { MainUseContext } from '../../context/MainContext'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { IoLogoYoutube } from 'react-icons/io'
import { RiMailSendFill } from 'react-icons/ri'
import { motion as m } from 'framer-motion'
function Footer(props) {
  const { dark } = MainUseContext()
  const style = {
    footer: `w-[100%] h-[120px] flex justify-between items-center p-10 border-t-2 border-gray-300 max_sm:gap-10 max_sm:p-3 ${
      dark ? 'bg-white' : 'bg-gray-800'
    }`,
    iconsDiv: `flex flex-row gap-5 text-[2rem] bg-white p-2 rounded-[15px] max_sm:text-[1rem]`,
  }

  const xAnimation = () => {
    let newArr = []
    for (let i = 0; i < 40; i++) {
      newArr.push(2, -2)
    }
    return newArr
  }
  return (
    <footer className={style.footer}>
      <div className={style.iconsDiv}>
        <m.a
          whileHover={{
            x: xAnimation(),
          }}
          transition={{ duration: 50 }}
          target="_blank"
          href="https://github.com/vindexTOS"
        >
          <BsGithub className="text-[#6e5494] cursor-pointer " />
        </m.a>
        <m.a
          whileHover={{
            x: xAnimation(),
          }}
          transition={{ duration: 50 }}
          target="_blank"
          href="https://www.linkedin.com/in/giorgi-kutateladze-a4a1b0259/"
        >
          {' '}
          <BsLinkedin className="text-[#0072b1] cursor-pointer " />{' '}
        </m.a>
        <m.a
          whileHover={{
            x: xAnimation(),
          }}
          transition={{ duration: 50 }}
          target="_blank"
          href="https://www.youtube.com/channel/UCQTgyKoHWV0v9iLogcJqHZA"
        >
          <IoLogoYoutube className="text-[#FF0000] cursor-pointer " />
        </m.a>
      </div>
      <div className="text-gray-300 text-[1rem] max_sm:text-[10px] text-center">
        ©2022-2023 Developed by Giorgi Kutateladze
      </div>
      <div className="flex items-center text-center justify-center text-gray-300 gap-2 text-[9px] max_sm:text-[6px]">
        <RiMailSendFill />
        <p>giorgikutateladze1998@gmail.com</p>
      </div>
    </footer>
  )
}

export default Footer
