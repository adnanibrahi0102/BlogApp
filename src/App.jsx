import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  const backgroundImageStyle = {
    backgroundImage: "url('https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    
  };


  return !loading ? (
    <div  className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet  />
        </main >
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
