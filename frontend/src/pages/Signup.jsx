import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Signup = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confPassword,setConfPassword]=useState();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("submit");
    }
  return (
    <div>
       <form onSubmit={handleSubmit} className="bg-blue-200 h-screen  flex flex-col"> 
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className='mb-8 text-3xl font-bold text-left text-black'>SIGN IN</h1>

            <input
              type="text"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              value={name}
              placeholder="name"            
              onChange={(e)=>setName(e.target.value)}

            />

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

<input
              type="text"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              value={confPassword}
              placeholder="confirm password"            
              onChange={(e)=>setConfPassword(e.target.value)}

            />
            <button type='submit' className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'> Register</button>
            <p className='mt-5'> Already have an account ? <Link className='text-blue-500' to='/signin'>Login</Link></p>

        </div>
        </div>
        
        </form> 
    </div>
  )
}

export default Signup