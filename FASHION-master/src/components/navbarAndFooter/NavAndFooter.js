import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AdminNav from './Admin'
import { useAuth } from '../../global/AuthContext'
const NavAndFooter = ({ children }) => {
  const { currentUser } = useAuth()

  return (
    <div>
      {currentUser ? <AdminNav /> : <Navbar />}
      {children}
      <Footer />
    </div>
  )
}

export default NavAndFooter
