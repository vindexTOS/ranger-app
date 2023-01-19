import { Link } from 'react-router-dom'

export const style = {
  nav: `flex flex-row  items-center justify-center gap-10 max_sm:gap-0 rounded-[14px] max_sm:rounded-[1px] max_sm:border-2 max_sm:w-[100%] border-r-2 border-t-2 w-[50%] h-[100px] max_md:w-[300px] max_sm:ml-10 `,
}
export const navbuttonstyling = (state) => {
  const linkbg =
    'linear-gradient(276deg, rgba(132,216,255,0.35647762522977944) 41%, rgba(132,216,255,0.37888658881521353) 91%)'
  return {
    background: `${state ? linkbg : 'none'}`,
    color: `${state ? '#1cb0f6' : 'grey'}`,
    outline: `${state ? '1px solid #1cb0f6' : 'none'}`,
  }
}
export const NavLinks = (title, link, state) => {
  const style = {
    link: `${'w-[9rem] h-[2.4rem] text-center flex items-center justify-center rounded-[12px] max_sm:rounded-[1px] max_sm:text-[15px] max_sm:w-[13rem] max_sm:h-[100%]  '}`,
  }
  return (
    <Link className={style.link} style={navbuttonstyling(state)} to={link}>
      {title}
    </Link>
  )
}
