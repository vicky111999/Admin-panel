import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Forgotpassword from './Pages/Forgotpassword'
import Otpreset from './Pages/Otpreset'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Adminlayouts from './Components/Adminlayouts'
import Admindashboard from './Pages/Admindashboard'
import Users from './Pages/Users'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      <Route path='/otpreset' element={<Otpreset/>}></Route>
      <Route path='*' element={"404 not found"}></Route>
      <Route path='/admin' element={<Adminlayouts role={2} />}>
      <Route index element={<Admindashboard/>}></Route>
      <Route path='users' element={<Users/>}></Route>
      <Route path='*' element={"404 not found"}></Route>
      </Route>
    </Routes>
  )
}

export default App