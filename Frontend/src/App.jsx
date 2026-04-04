import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userpage from './Pages/Userpage'
import Forgotpassword from './Pages/Forgotpassword'
import Otpreset from './Pages/Otpreset'
import Signup from './Components/Signup'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Userpage/>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      <Route path='/otpreset' element={<Otpreset/>}></Route>
    </Routes>
  )
}

export default App