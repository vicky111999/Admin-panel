import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userpage from './Pages/Userpage'
import Forgotpassword from './Pages/Forgotpassword'
import Otpreset from './Pages/Otpreset'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Userpage/>}></Route>
      <Route path='/login' element={<Userpage/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      <Route path='/otpreset' element={<Otpreset/>}></Route>
    </Routes>
  )
}

export default App