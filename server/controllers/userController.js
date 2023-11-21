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
      res.status(201).json({
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
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),

  })
  res.status(200).json({ message: 'User successfully logged out' });
}

//@des      get user profile
// @route   POST /api/users/profile
// @access  private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user);
});

//@des      update user profile
// @route   POST /api/users/profile
// @access  private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name; //if the user didnt update the name i need to put the same name so user.name use gareko
    user.email = req.body.email || user.email; //if the user didnt update the name i need to put the same name so user.name use gareko

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser=await user.save()
    console.log(updatedUser)
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })

  } else {
    res.status(404);
    throw new Error("User not found!");
  }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


