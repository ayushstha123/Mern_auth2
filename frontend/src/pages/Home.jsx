import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const {userInfo}=useSelector((state)=>state.auth);
  return (
    <div>
        <h1 className='text-4xl font-light m-5'> {userInfo? 
        (<>
        Welcome {userInfo.name}
        </>)
        : ''}</h1>
        </div>
  )
}

export default Home