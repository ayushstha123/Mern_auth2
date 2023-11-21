import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav className=' bg-blue-400 w-full p-2 '>
           <div className='flex justify-between '>
            <h1 className='font-extrabold '> AUTH</h1>
           <div className='flex gap-5'>
           <Link to={'/signin'} ><button className='px-4 py-1 rounded font-thin bg-purple-500 border-none shadow-md text-white'>Sign in</button></Link>
           <Link to={'/signup'} ><button className='px-4 py-1 rounded font-thin bg-red-500 border-none shadow-md text-white'>Sign up</button></Link>
           </div>
           </div>
        </nav>
    </div>
  )
}

export default Header