import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
//@des      Auth user/set Token
// @route   POST /api/users/auth
// @access  public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};


//@des      Register a new user
// @route   POST /api/users/
// @access  public

export const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the user already exists
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        res.status(400).json({ message: 'User already exists!' });
        return;  // Return to avoid further execution
      }
  
      // If the user does not exist, create a new user
      const user = await User.create({
        name,
        email,
        password,
      });
  
      if (user) {
        generateToken(res, user._id);
        res.status(200).json({ _id: user._id, name: user.name, email: user.email });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);
  
      // Return a more detailed error response
      res.status(500).json({ message: 'Internal Server Error', error: error.message || 'Unknown error' });
    }
  };
  

//@des      Logout a user
// @route   POST /api/users/logout
// @access  public
export const logoutUser=(req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0),

  })
  res.status(200).json({message:'User successfully logged out'});
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


