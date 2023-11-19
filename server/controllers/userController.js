import asyncHandler from 'express-async-handler';


//@des      Auth user/set Token
// @route   POST /api/users/auth
// @access  public
export const authUser=(req,res)=>{
    res.status(200).json({message:'user authentication'})
}

//@des      Register a new user
// @route   POST /api/users/
// @access  public
export const registerUser=(req,res)=>{
    res.status(200).json({message:'Register a new user'})
}

//@des      Logout a user
// @route   POST /api/users/logout
// @access  public
export const logoutUser=(req,res)=>{
    res.status(200).json({message:'logout user'});
}

//@des      get user profile
// @route   POST /api/users/profile
// @access  private
export const getUserProfile=(req,res)=>{
    res.status(200).json({message:'User Profile'});
}

//@des      update user profile
// @route   POST /api/users/profile
// @access  private
export const updateUserProfile=(req,res)=>{
    res.status(200).json({message:'Update user'});
}


