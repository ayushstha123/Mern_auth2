import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import {toast} from 'react-toastify';

const SignIn = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [login,{isLoading}]=useLoginMutation();

    const {userInfo}=useSelector((state)=>state.auth);

    useEffect(()=>{
      if(userInfo){
        navigate('/');
      }
    },[navigate,userInfo]);

    const handleSubmit=async(e)=>{
        e.preventDefault();

try {
  const res=await login({email,password}).unwrap();
  dispatch(setCredentials({ ...res }));  
  navigate('/');  
  toast.success("Sign in successful");

} catch (err) {
  toast.error(err?.data?.message || err.error);
}      }
  return (
    <div>
       <form onSubmit={handleSubmit} className="bg-blue-200 h-screen flex flex-col"> 
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className='mb-8 text-3xl font-bold text-left text-black'>SIGN IN</h1>

            <input
              type="text"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              value={email}
              placeholder="email"            
              onChange={(e)=>setEmail(e.target.value)}

            />

            <input
              type="password"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              value={password}
              placeholder="password"            
              onChange={(e)=>setPassword(e.target.value)}

            />
            <button type='submit' className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'> {isLoading ? 'Loading...' : 'Sign In '}</button>
            <p className='mt-5'>  New User? <Link className='text-blue-500' to='/signup'>Register</Link></p>

        </div>
        </div>
        
        </form> 
    </div>
  )
}

export default SignIn