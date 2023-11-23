import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'
const ProfileRoute = () => {
    const {userInfo}=useSelector((state)=>state.auth);
  return userInfo ? <Outlet/> : <Navigate to="/signin" replace/>
}

export default ProfileRoute