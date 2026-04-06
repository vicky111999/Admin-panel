import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { UseAuth } from '../Context/UseAuth'

const Adminlayouts = ({role}) => {
  const {user} = UseAuth()
  if(!user || role !== user.data.data.id ){
    return <Navigate to='/login'/>
  }
  return (
<>
<header>Header</header>
<main><Outlet/></main>
<footer>
  Footer
</footer>
</>
  )
}

export default Adminlayouts