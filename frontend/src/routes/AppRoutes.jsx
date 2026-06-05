import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/user/Home.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'

const AppRoutes = () => {
  return (
    <Routes>

      {/*User Routes*/}
      <Route path = "/" element = {<Home/>} />

      {/*Auth Routes*/}
      <Route path = "/login" element = {<Login/>} />
      <Route path= "/register" element = {<Register/>}/>
        
    </Routes>
  )
}

export default AppRoutes