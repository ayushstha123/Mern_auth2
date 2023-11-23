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
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
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
// @route   get /api/users/profile
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
// @route   put /api/users/profile
// @access  private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if the new email is provided and if it's different from the current email
      if (req.body.email && req.body.email !== user.email) {
        // Check if the new email already exists in the database
        const emailExists = await User.findOne({ email: req.body.email });

        if (emailExists) {
          res.status(400).json({ message: 'Email is already in use' });
          return;
        }

        // If the email is not in use, update the user's email
        user.email = req.body.email;
      }

      // Update other user information
      user.name = req.body.name || user.name;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log(updatedUser);

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found!');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


