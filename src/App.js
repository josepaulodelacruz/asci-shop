import React, { useEffect, useState } from 'react'
import HomePage from './pages/homepage'
import './App.scss'
import './index.css'

const App = () => {
  const [navbar, setNavbar] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 0) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  };
  return(
    <div className="e-commerce__main-container">
      <HomePage isShow={navbar}/>
    </div>
  )
}


export default App;
