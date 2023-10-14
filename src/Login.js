import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error , setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem("method", "login")
                navigate('/')
            })
            .catch((error) => {
                setError(true)
                console.log(error)
            })
        
    }

  return (
    <div className='container flex justify-center items-center bg-gradient-to-b from-orange-500 to-yellow-300 h-screen'>
        <div className="card flex flex-col bg-white p-4 w-[25%] shadow-lg shadow-gray-900 rounded-xl">
            <div className="top">
                <div className="icon"></div>
                <div className="header text-4xl m-2">Login</div>
            </div>

            <div className="body">
                <form className='flex flex-col'>
                    <input type="email" className="email m-2 p-2 border border-b-4 rounded-2xl" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" className="password m-2 p-2 border border-b-4 rounded-2xl" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {
                        error && <div className='text-red-600 font-extrabold m-4'>Wrong username or password !</div>

                    }
                    
                    <button className="sign-up bg-black text-white my-2 p-2 rounded" onClick={handleSubmit}>Sign In</button>
                </form>

                <div>Don't have an account?<span className='cursor-pointer text-blue-600 font-bold'><Link to='/register' className='italic font-bold'> Register here!</Link></span></div>
            </div>
        </div>
    </div>
  )
}
