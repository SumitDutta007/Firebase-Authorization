import React, { useEffect } from 'react'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const Home = ({user}) => {
  useEffect(() => {
    const notify = () => {
      let Method = localStorage.getItem("method");
      Method ==='login'?
      toast('Successfully Logged in ! ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        :
        toast('User Successfully Registered ! ✅', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          localStorage.removeItem("method");
    }
  
    return () => {
      notify();
    }
  }, [])
  

  const navigate = useNavigate()

  const SignOut = () => {
    signOut(auth)
    .then(()=>{
      navigate('/login')
    })
    .catch(()=>{
      console.log('error')
    })
  }

  return (
    <div className='home bg-gradient-to-r from-red-500 to-yellow-300 h-screen flex justify-center items-center'>
        <div className="container flex justify-center flex-col items-center h-[80%] w-[80%] border-2 rounded-lg shadow-[5px_5px_15px_0px_black] overflow-hidden relative">
        <div className='text-8xl text-white font-serif underline underline-offset-8 mb-5'>{`Welcome ${user.displayName}`}</div>
        <div className='text-5xl text-slate-300 font-seri'>{`${user.email}`}</div>
        <button onClick={SignOut} className='bg-slate-300 p-2 px-4 absolute bottom-0 border-round text-3xl font-mono'>Log Out</button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          {/* Same as */}
        <ToastContainer />
        </div>
    </div>
  )
}
