import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Adminlayouts = ({role}) => {
  const token = localStorage.getItem('token')
  const tokenparsed = JSON.parse(token)
  if(role !== tokenparsed.roleid)
  {
    return <Navigate to='/login'/>
  }
  return (
<div className='h-screen flex '>
<aside className='bg-[var(--primary-white)]'><Sidebar/></aside>
<div className='grid grid-rows-1 md:grid-rows-[1fr_7fr] w-full'>
<header><Navbar/></header>
<main><Outlet/></main>
</div>
</div>
  )
}

export default Adminlayouts