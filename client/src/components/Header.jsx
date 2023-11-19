import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
  const activeLink=({isActive})=>(isActive ? "active" : "");

const Header = () => {
  const navigate=useNavigate();
 const goHome =()=>{
  navigate('/');
 }

  return (
    <div>
	<nav className='bg-blue-400 p-2'>
        <div className='flex justify-between px-5'>
        <div><h1 className='text-2xl mt-1 font-bold cursor-pointer ' onClick={goHome}>Auth-App</h1>
</div>
<div className='flex'>
    <div className='flex'>
        <img className='mx-2 w-12 h-12 rounded-full' src="https://static.vecteezy.com/system/resources/previews/024/677/981/non_2x/3d-icon-of-men-profil-people-free-png.png" alt="logo" />
    <p className='mr-10 mt-3 font-thin'>Hi Ayush | </p>
    <NavLink to='/profile' className={`${activeLink} mr-10 mt-3 font-normal`}>Profile</NavLink>
    </div>
        <button className='bg-blue-800 text-white p-1 mx-2 rounded-lg px-5 font-light shadow-md hover:shadow-lg hover:bg-black'>
           <Link to='/login'>Login</Link>
            </button>
            <button className='bg-red-800 mx-2 text-white p-1 rounded-lg px-5 font-light shadow-md hover:shadow-lg hover:bg-black'>
           Logout
            </button>
        </div></div>
    </nav>
    </div>
  )
}

export default Header