import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar.jsx'
import Footer from './components/common/Footer.jsx'
import Loader from './components/common/Loader.jsx'


const App = () => {
  return (
    <div>
      <Navbar />
   
      <AppRoutes />
      <Footer/>
    </div>
    
  )
}

export default App