import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react'

export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [submitButtonDisabled , setSubmitButtonDisabled] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitButtonDisabled(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                setSubmitButtonDisabled(false)
                const user = res.user
                await updateProfile(user, {
                    displayName: name,
                })
                localStorage.setItem("method", "register")
                navigate('/')
            })
            .catch((error) => {
                setSubmitButtonDisabled(false)
                console.log(error)
            })

    }   


  return (
    <div className='container flex justify-center items-center bg-gradient-to-b from-orange-500 to-yellow-300 h-screen'>
        <div className="card flex flex-col bg-white p-4 w-[25%] shadow-lg shadow-gray-900 rounded-xl">
            <div className="top">
                <div className="icon"></div>
                <div className="header text-4xl m-2">Register</div>
            </div>

            <div className="body">
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="text m-2 p-2 border border-b-4 rounded-2xl" placeholder='Name' />
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="email m-2 p-2 border border-b-4 rounded-2xl" placeholder='email'/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="password m-2 p-2 border border-b-4 rounded-2xl" placeholder='password'/>
                    
                    <button className="sign-up bg-black text-white my-2 p-2 rounded" disabled={submitButtonDisabled}>Sign Up</button>
                </form>

                <div>Already have an account ? <span className='cursor-pointer text-blue-600 font-bold'><Link to='/login'>Login!</Link></span></div>
            </div>
        </div>
    </div>
  )
}
