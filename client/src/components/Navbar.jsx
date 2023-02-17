import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBeer } from "react-icons/fa";


const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )
}

import logo from "../../images/logo.png";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav className='w-full flex md:justify-center justify-between itemos-center p-4'>
      <div className='md:flex[0.5] flex-initial justify-center items-center'>
        <img src={logo} alt="logo" className='w-32 cursor-pointer' />

      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
          return <NavbarItem key={item + index} title={item} />
        })}
        <li className='bg-[#2952e3] text-inherit py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>
        {/* <li className='bg-[#2952e3] text-inherit py-2 px-7 mx-4 rounded-full cursor-pointer hover:gb-[#2546bd]'></li> */}
      </ul>
      <div className='flex relative'>
        {
          toggleMenu ?
            <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} />
            : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <ul className='z-1'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
              return <NavbarItem key={item + index} title={item} classProps='my-2 text-lg'/>
            })}
          </ul>
        )}
      </div>
    </nav>
  )
}
