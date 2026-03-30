import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userpage from './Pages/Userpage'

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Userpage/>}></Route>
      <Route path='/login' element={<Userpage/>}></Route>
    </Routes>
  )
}

export default App