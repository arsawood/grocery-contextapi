import React from 'react'

function Footer() {
  const date = new Date()
  const currentYear = date.getFullYear()

  // expected output: 1969

  return (
    <footer className='text-center mb-2'>
      {/* <big>&copy; Copyright {currentYear} Grocery</big> */}
    </footer>
  )
}

export default Footer
