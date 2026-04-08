import React, { useState } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Adminlayouts = ({role}) => {
  const [devs,setDevs] = useState({
    title:'',
    button:null
  })
  const token = localStorage.getItem('token')
  const tokenparsed = JSON.parse(token)
  if(role !== tokenparsed.roleid)
  {
    return <Navigate to='/login'/>
  }
  return (
<div className='h-screen flex w-full'>
<aside className='bg-[var(--primary-white)] '><Sidebar/></aside>
<div className='grid grid-rows-1 md:grid-rows-[1fr_7fr] w-full h-full px-4 pt-6'>
<header><Navbar title={devs?.title} button={devs.button}/></header>
<main><Outlet context={{setDevs}}/></main>
</div>
</div>
  )
}

export default Adminlayouts