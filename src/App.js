import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './Registration';
import  { Login } from './Login';
import { Home } from './Home';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

function App() {

  const [authUser, setAuthUser] = useState(null)
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthUser(user)
      }else{
        setAuthUser(null)
      }
    })
    return () => {
      listener()
    }
  },[])

  const ProtectedRoute = ({children})=>{
    if(!authUser){
      return <Navigate to="/login"/>
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home user={authUser?authUser:null}/>
            </ProtectedRoute>
            }>
            </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
