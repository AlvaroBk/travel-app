import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo)
  };

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div>
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>TRAVEL</h1>
      </div>
      {/* <ul className='hidden md:flex'>
        <li>Home</li>
        <li>Destinations</li>
      </ul> */}
      <div onClick={handleNav} className={logo ? 'hidden md:flex' : 'block'}>
        <BsPerson size={30} />
      </div>

      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/70 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1>TRAVEL</h1>
          <div className='flex flex-col items-end'>
            <button className='px-2 py-1 rounded-md'>Sign</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
