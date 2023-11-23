import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import { useUpdateMutation } from '../slices/userApiSlice';

const Profile = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confPassword,setConfPassword]=useState();

    const [update,{isLoading}]=useUpdateMutation();

    const {userInfo}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    useEffect(()=>{
      setName(userInfo.name);
      setEmail(userInfo.email);
    },[userInfo.setName,userInfo.setEmail]);

    const updateProfile=async(e)=>{
        e.preventDefault();
        if (password !== confPassword) {
          toast.error('Passwords do not match');
        } else {
          try {
            const res=await update({
              _id:userInfo._id,
              name,
              email,
              password
            }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            toast.success('Profile updated successfully');
            navigate('/');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
                }
      };
  return (
    <div>
       <form onSubmit={updateProfile} className="bg-blue-200 h-screen  flex flex-col"> 
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className='mb-8 text-3xl font-bold text-left text-black'>PROFILE</h1>

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
              type="password"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              value={confPassword}
              placeholder="confirm password"            
              onChange={(e)=>setConfPassword(e.target.value)}

            />
            <button type='submit' className='w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'>{isLoading ? 'Loading...' : 'Update Profile'}</button>

        </div>
        </div>
        
        </form> 
    </div>
  )
}
export default Profile