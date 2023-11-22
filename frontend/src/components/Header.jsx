import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const {userInfo}=useSelector((state)=>state.auth);
const dispatch=useDispatch();
const navigate =useNavigate();

const [logoutApiCall]=useLogoutMutation();
  const logoutHandler=async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/signin');
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div>
        <nav className=' bg-blue-400 w-full p-2 '>
           <div className='flex justify-between '>
            <h1 className='font-extrabold '> AUTH</h1>
           <div className='flex gap-5'>
            {userInfo ? 
            <>
            <Link to={'/profile'} ><button className='px-4 py-1 rounded font-thin text-white'>{userInfo.data.name}</button></Link>
            <button className='px-4 py-1 rounded font-thin bg-red-600 border-none shadow-md text-white' onClick={logoutHandler}>Logout</button>

            </>         
           :
          (<>
          <Link to={'/signin'} ><button className='px-4 py-1 rounded font-thin bg-purple-500 border-none shadow-md text-white'>Sign in</button></Link>
           <Link to={'/signup'} ><button className='px-4 py-1 rounded font-thin bg-red-500 border-none shadow-md text-white'>Sign up</button></Link>
          </>)
          
          }
           </div>
           </div>
        </nav>
    </div>
  )
}

export default Header