import React from 'react'
import { Searchicon } from './Svg'

const Navbar = ({title,button}) => {
  return (
  
    <div className='flex items-center justify-between pb-6'>
      <div className='flex gap-20'>
      <p className='text-[var(--primary-violet)] text-[25px] font-bold font-lato'>{title}</p>
      <div className='relative flex items-center px-3 w-[300px] h-[46px] border-1 rounded-[30px] border-[var(--primary-border)] bg-[var(--primary-white)]'>
      <input type='text' placeholder='Search anything here...' className='placeholder:text-[var(--primary-text)]'/>
      <Searchicon className={`absolute top-3 right-5`}/>
      </div>
      </div>
      {button}
    </div>
    )
}

export default Navbar